import { actions } from "astro:actions";

export const Button = () => {
  const handleClick = async () => {
    const { data, error } = await actions.getGreeting({ name: "Houston" });

    if (!error) alert(data);
  };

  return <button onClick={handleClick}>.</button>;
};
