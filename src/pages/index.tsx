//CSS module
import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
// import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

//ssr
// export const getServerSideProps = async () => {
//ssg
export const getStaticProps = async () => {
  // 페이지 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // 브라우저에서만 사용할 수 있는 것을 사용하면 에러가남. (해당 Props자체가 서버에서 실행되기 때문.)

  console.log("인덱스 페이지");

  //함수 병렬 동작
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  // return에는 props라는 단하나의 객체로 넣어줘야함(문법)
  return {
    props: { allBooks, recoBooks },
    revalidate: 3,
  };
};

//getServerSideProps : 자동으로 타입을 추론해서 선언해줌

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

//searchable Layout 적용
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
