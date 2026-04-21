import { useParams } from "react-router-dom";
import RoomDetailsHero from "../components/RoomDetailsHero";
import { useRoom } from "../hooks/useRoom";
import RoomDetailsContent from "../components/RoomDetailsContent";

const RoomDetail = () => {
  const { slug } = useParams();
  const { room, loading, error } = useRoom(slug);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <p className="text-center text-lg font-medium">Loading room details…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <p className="text-center text-red-600 text-lg font-medium">{error}</p>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <p className="text-center text-lg font-medium">Room not found.</p>
      </main>
    );
  }

  return (
    <main>
      <RoomDetailsHero room={room} />
      <RoomDetailsContent room={room} />
    </main>
  );
};

export default RoomDetail;
