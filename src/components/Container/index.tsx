type Props = {
  title: string;
  children: React.ReactNode;
};

const Container = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-2">
      <span className="text-3xl font-bold first-letter:text-red-500">{title}</span>
      <div className="p-4 w-screen md:w-9/12 max-w-5xl">{children}</div>
    </div>
  );
};

export default Container;
