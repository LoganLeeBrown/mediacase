import { type NextPage } from "next";
import { api } from "~/utils/api";
import Image from "next/image";
import MLogoTemp from "../../public/MLogoTemp.png";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { ListView } from "~/components/ListView";

const Home: NextPage = () => {
  const { user } = useUser();

  if (!user) return <div />;

  const id = user.id;

  const { data, isLoading: countLoading } = api.user.getUserCountById.useQuery({
    id,
  });

  if (countLoading) {
    return <h1>Loading...................</h1>;
  }

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
          {data == 0 && <SyncUserWizard userId={id} />}
          {data != 0 && <Feed userId={id} />}
        </div>
        <div></div>
      </main>
    </>
  );
};

const SyncUserWizard = (props: { userId: string }) => {
  const { mutate } = api.user.createUser.useMutation({
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

  return (
    <div className="flex flex-col">
      <button
        className="w-28 rounded-sm bg-white shadow-lg"
        onClick={() => mutate({ content: props.userId })}
      >
        SyncUser
      </button>
    </div>
  );
};

const Feed = (props: { userId: string }) => {
  const { data, isLoading: listsLoading } = api.list.getByOwnerId.useQuery({
    id: props.userId,
  });

  if (listsLoading)
    return (
      <div className="flex flex-col">
        <div>Loading</div>
      </div>
    );

  if (!data) return <div>oop, no lists</div>;

  return (
    <div className="flex w-full flex-col">
      {data.map((list) => (
        <ListView {...list} key={list.id} />
      ))}
    </div>
  );
};

export default Home;
