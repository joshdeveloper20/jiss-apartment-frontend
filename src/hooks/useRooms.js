import { useEffect, useState } from "react";
import { getRooms } from "../services/api";

let cachedRooms = null;
let cachedPromise = null;

export function useRooms() {
  const [rooms, setRooms] = useState(cachedRooms || []);
  const [loading, setLoading] = useState(!cachedRooms);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedRooms) {
      return;
    }

    if (!cachedPromise) {
      cachedPromise = getRooms()
        .then((data) => {
          cachedRooms = data;
          return data;
        })
        .catch((err) => {
          throw err;
        });
    }

    cachedPromise
      .then((data) => {
        setRooms(data);
        setError(null);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || err.message || "Failed to load rooms",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { rooms, loading, error };
}
