import { redirect} from "next/navigation";
const page = () => {
  redirect("/hackathon");
  return <div></div>;
};

export default page;
