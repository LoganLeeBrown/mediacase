import Head from "next/head";
import Link from "next/link";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Image from "next/image";
import MLogoTemp from "../../public/MLogoTemp.png";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex h-screen justify-center bg-gradient-to-t from-orange-400 to-orange-100">
        <div>
          <Image
            className="my-2 h-20 w-20 invert md:h-40 md:w-40"
            src={MLogoTemp}
            alt="logo"
          />
        </div>
        <div></div>
        <div></div>
      </main>
    </>
  );
};

const Feed = () => {
  // const { data, isLoading: postsLoading } = api.lists.getAll.useQuery();

  // if (postsLoading)
  //   return (
  //     <div className="flex flex-col">
  //       <LoadingPage />
  //     </div>
  //   );

  // if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {/* {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))} */}
    </div>
  );
};

export default Home;
