// import {useState, useRef}from "react";

// const DiaryEditor = ({onCreate}) => {


//     const authorInput= useRef();// ref객체, dom 접근
//     const contentInput= useRef();// ref객체
//     const [state, setState]=useState({
//         content:"",
//         author:"",
//         emotion:1
//     })

//     const handleChangeState= (e)=>{

//         setState({
//             ...state,
//             [e.target.name]: e.target.value,
//         })

//     }

//     const handleSubmit= ()=>{
       
//         if(state.author.length <1){
//             // alert("작성자는 1글자 이상이어야합니다.")// alert는 트렌디한 방법이 아니다.
//             authorInput.current.focus();
//             // authorInput.current는 저 input 태그가 되는것이고
//             // focus!
//             return;
//         }

//         if(state.content.length <5){
//             contentInput.current.focus();
//             return;
//         }

//         onCreate(state.author, state.content,state.emotion);
//         alert('저장 성공')
//         setState({
// author:"",
// content:"",
// emotion:1
//         })
//     }
//     // const [author, setAuthor]=useState("정원철");
//     // const [content, setContent]=useState("");

//     // 좀 더 직관적으로 클래스 네임을 맞춰줌
//     return ( 
//     <div className = "DiaryEditor" > 
//         <h2>오늘의 일기</h2>

// {/*1. 작성자 한줄 입력받기 */}
//         <div>
//         <input ref={authorInput} name="author"
//         value={state.author} 
//         onChange={handleChangeState}/>
//         </div>

// {/*2. 게시글 여러줄 입력받기 */}
// <div>
// <textarea ref={contentInput} name="content" value={state.content} onChange={handleChangeState}/>
// </div>

// {/*3. 감정 정도 선택하는 select */}
// <select name="emotion" value={state.emotion} onChange={handleChangeState}>
// <option value={1}>1</option>
// <option value={2}>2</option>
// <option value={3}>3</option>
// <option value={4}>4</option>
// <option value={5}>5</option>
// </select>

// {/*4. 일기 저장 파트 */}

// <div>

//     <button onClick={handleSubmit}> 일기 저장</button>
// </div>

//     </div>
//     )
// }

// export default DiaryEditor;



import { useRef, useState,useEffect } from "react";
import React from "react";
const DiaryEditor = (({ onCreate }) => {

useEffect(()=>{
console.log("DiaryEditor 렌더");
})

  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    setState({
      author: "",
      content: "",
      emotion: 1
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          value={state.author}
          onChange={handleChangeState}
          name="author"
          placeholder="작성자"
          type="text"
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          value={state.content}
          onChange={handleChangeState}
          name="content"
          placeholder="일기"
          type="text"
        />
      </div>
      <div>
        <span>오늘의 감정점수 : </span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
});
export default React.memo(DiaryEditor);
