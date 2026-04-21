import { useEffect, useState } from "react";
import { getRoomById, getRoomBySlug } from "../services/api";

const cachedRoomsByKey = {};
const cachedPromisesByKey = {};

const isObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(value);
const fetchRoom = async (key) => {
  if (!key) {
    throw new Error("Missing room identifier");
  }

  return isObjectId(key) ? getRoomById(key) : getRoomBySlug(key);
};

export function useRoom(key) {
  const [room, setRoom] = useState(key ? cachedRoomsByKey[key] || null : null);
  const [loading, setLoading] = useState(
    Boolean(key && !cachedRoomsByKey[key]),
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!key) {
      setRoom(null);
      setLoading(false);
      setError(null);
      return;
    }

    if (cachedRoomsByKey[key]) {
      setRoom(cachedRoomsByKey[key]);
      setLoading(false);
      setError(null);
      return;
    }

    let didCancel = false;

    if (!cachedPromisesByKey[key]) {
      cachedPromisesByKey[key] = fetchRoom(key).then((data) => {
        cachedRoomsByKey[key] = data;
        return data;
      });
    }

    setLoading(true);
    cachedPromisesByKey[key]
      .then((data) => {
        if (!didCancel) {
          setRoom(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!didCancel) {
          setError(
            err.response?.data?.message || err.message || "Failed to load room",
          );
        }
      })
      .finally(() => {
        if (!didCancel) {
          setLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [key]);

  return { room, loading, error };
}
