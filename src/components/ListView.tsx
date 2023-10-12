import type { RouterOutputs } from "~/utils/api";

type List = RouterOutputs["list"]["getByOwnerId"][number];

export const ListView = (props: List) => {
  const { id, name } = props;
  return (
    <div key={id}>
      <div className="m-2 flex w-full flex-col justify-start rounded-lg border-8 border-white">
        <header className="bg-white  pl-2 pt-2 font-serif">{name}</header>
        <div className="p-8"></div>
      </div>
    </div>
  );
};
