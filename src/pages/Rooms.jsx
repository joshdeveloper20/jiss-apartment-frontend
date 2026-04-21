import RoomHero from "../components/RoomHero";
import RoomShowCase from "../components/RoomShowCase";
import { useRooms } from "../hooks/useRooms";

const Rooms = () => {
  const { rooms, loading, error } = useRooms();

  return (
    <>
      <RoomHero />
      <RoomShowCase rooms={rooms} loading={loading} error={error} />
    </>
  );
};

export default Rooms;
