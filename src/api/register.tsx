import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import axios from "axios";

type Repo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
};

export const getServerSideProps: GetServerSideProps<{
  repo: Repo;
}> = async () => {
  const res = await axios.post("http://127.0.0.1:3333/api/v1/register");
  const repo = await res.json();
  return { props: { repo } };
};

// export default function Page({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return repo.stargazers_count
// }
