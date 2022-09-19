import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import { useCallback, useEffect, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import useSWRInfinite from "swr/infinite";
import "./App.css";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

const AccesKey = process.env.REACT_APP_API_KEY;
const getKey = (pageIndex, previousPageData, query) => {
  // 현재페이지의 index, 이전페이지의 data
  if (!query) return null;
  if (previousPageData && previousPageData?.results?.length === 0) return null; // 마지막 데이터에 도달했다면
  // new key return
  return `https://api.unsplash.com/search/photos?client_id=${AccesKey}&page=${
    pageIndex + 1
  }&query=${query}&per_page=12`;
};

function App() {
  const [query, setQuery] = useState("");
  const ref = useRef();
  const isIntersecting = useIntersectionObserver(ref);

  const onKeyDown = useCallback((event) => {
    // string 앞뒤로 빈칸 확인
    if (event.key === "Enter" && event.target.value.trim().length > 0) {
      setQuery(event.target.value.trim());
    }
  }, []);

  // api호출
  const fetcher = async (url) => {
    const res = await fetch(url);
    return res.json();
  };

  // get new key
  const { data, error, setSize, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, query),
    fetcher,
    {
      // 옵션
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    }
  );

  // flat() : [[1,2,3,],[4,5,6,]] -> [1,2,3,4,5,6]
  // 판별 상태
  const photos = data?.map((item) => item.results).flat() ?? []; // undefined 라면 []
  const isEmpty = data?.[0]?.results?.length === 0; // 검색결과 없음
  const isEnd = photos.length === data?.[0].total; // 마지막 데이터에 도달
  const isLoading = (!data && !error && query) || isValidating;

  useEffect(() => {
    if (isIntersecting && !isEnd && !isLoading) {
      setSize((oldSize) => oldSize + 1);
    }
  }, [isIntersecting, isEnd, isLoading, setSize]);

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="search-input"
          onKeyDown={onKeyDown}
        />
      </div>
      {isEmpty ? <div className="no-result">No Images Found</div> : null}
      <div className="image-container">
        {photos.map(({ urls, alt_description }, index) => (
          <img
            className="image"
            key={index}
            src={urls?.regular}
            alt={urls?.alt_description}
          />
        ))}
      </div>

      <div ref={ref} className="loading">
        {isLoading ? (
          <RotatingLines strokeColor="grey" width="100" />
        ) : isEnd && !isEmpty ? (
          <p>- No More Images -</p>
        ) : null}
      </div>
    </>
  );
}

export default App;
