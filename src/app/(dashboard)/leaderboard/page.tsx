import { getAllUsersRatings } from "@/actions/ratings";
import Leaderboard from "@/components/LeaderBoard";

async function page() {
  const data = await getAllUsersRatings();

  return (
    <div className="">
      <Leaderboard entries={data} />
    </div>
  );
}

export default page;
