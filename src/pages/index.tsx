import Head from "next/head";
import Link from "next/link";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Image from "next/image";
import MLogoTemp from "../../public/MLogoTemp.png";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

const Home: NextPage = () => {
  const { isSignedIn, user } = useUser();

  if (!user) return <div />;

  const id = user.id;

  return (
    <>
      <main className="flex h-screen flex-col justify-normal bg-gradient-to-t from-orange-400 to-orange-100">
        <div className="flex w-screen justify-center">
          <Image
            className="my-2 h-20 w-20 invert md:h-40 md:w-40"
            src={MLogoTemp}
            alt="logo"
          />
        </div>
        <div className="mx-10 flex justify-start">
          <Feed />
        </div>
        <div></div>
      </main>
    </>
  );
};

const Feed = () => {
  const { isSignedIn, user } = useUser();

  if (!user) return <div />;

  const id = user.id;

  const { data, isLoading: countLoading } = api.user.getUserCountById.useQuery({
    id,
  });

  const { mutate, isLoading: isPosting } = api.user.createUser.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]!);
      } else {
        toast.error("Failed to update! Please try again later.");
      }
    },
  });

  if (countLoading) {
    return <h1>Loading...................</h1>;
  }
  return (
    <div className="flex flex-col">
      {data == 0 && (
        <button
          className="w-28 rounded-sm bg-white shadow-lg"
          onClick={() => mutate({ content: id })}
        >
          SyncUser
        </button>
      )}
    </div>
  );
};

export default Home;
