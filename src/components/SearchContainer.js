import React, { useState, useEffect, useCallback } from "react";
import { navigate } from "gatsby";
import * as styles from "./SearchContainer.module.scss";
import * as JsSearch from "js-search";

export default function SearchContainer({ searchIndex }) {
  const [search, setSearch] = useState({
    results: [],
    engine: {},
    query: "",
  });

  //initialation function
  const rebuildIndex = useCallback(() => {
    //instance를 만들어야 함, 대신 unique한 녀석이 들어가야 하기 때문에 slug을 기입
    const searchEngine = new JsSearch.Search("slug");
    //그 다음에 search할 키워드을 봐야한다

    //CaseSensitive...는 알아볼 필요가 있어 보인다.. 대소문자 가리고 찾아주는 것 같다
    searchEngine.sanitizer = new JsSearch.CaseSensitiveSanitizer();

    searchEngine.indexStrategy = new JsSearch.PrefixIndexStrategy();
    //prefix같은 경우는 만약 "cat" 찾아야 한다고 했을 때 절대로
    //"c"는 포함되어야 찾게 되는 것을 말한다, 만약 "at" 할 경우 못 찾음

    searchEngine.searchIndex = new JsSearch.TfIdfSearchIndex("slug");
    // 만약 'at'라는 녀석으로 검색했을 때 그 녀석의 tf, idf를 기반으로
    // 검색 순서를 정함
    // Tf - term frequency
    // Idf - inverse document frequency
    // tf -> 3/ 100 = 0.03
    // idf -> log(10 000 000/ 1000) = 4
    // 0.03 * 4 = 0.12 이렇게 계산해서 높은 녀석을 먼저 보내주는 방법이다

    searchEngine.addIndex("title");
    searchEngine.addIndex("subtitle");
    // 그 다음에 search할 파일을 봐야 한다, addDocuments이다 's'를 주의하자
    searchEngine.addDocuments(searchIndex.blogs);

    setSearch((search) => ({ ...search, engine: searchEngine }), []);
  }, [searchIndex]);

  //이렇게 무한 루프가 날 떄는 useCallback을 사용하는 것도 하나의 테크닉이다
  useEffect(() => {
    rebuildIndex();
  }, [rebuildIndex]);

  const performSearch = (e) => {
    const searchValue = e.target.value;
    const results = search.engine.search(searchValue);
    setSearch({ ...search, results, query: searchValue });
  };

  return (
    <div>
      <input
        onChange={performSearch}
        style={{ width: "200px" }}
        className="input"
        type="text"
        placeholder="Search"
      />
      {search.results.length > 0 && (
        <div className={`${styles.options} select is-multiple`}>
          <ul>
            {search.results.map((result) => (
              <li
                onClick={() => {
                  navigate(`/blogs/${result.slug}`);
                }}
                role="presentation"
                key={result.slug}
                className={`${styles.option} p-2`}
              >
                <p className={`${styles.title}`}>{result.title}</p>
                <p className={`${styles.subtitle}`}>{result.subtitle}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
