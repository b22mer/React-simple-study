// import DiaryItem from "./DiaryItem";


// const DiaryList=({onEdit,onRemove,diaryList})=>{
// console.log(diaryList);
//     return(
//         <div className="DiaryList">
//             <h2>다이어리 리스트</h2>
//             <h4>{diaryList.length}개의 일기가 존재합니다.</h4>

//             <div>
//                 {diaryList.map((it)=>(
//                     // (,idx)도 사용이 가능하나 쓰지마라
//                     <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove}/>
          
//                 ))}



//             </div>
//         </div>
//     )
// }

// // 배열로 안오고 언디파인드로 올수도 있기에
// DiaryList.defaltProps={
//     diaryList:[]
// }

// export default DiaryList;
import React, { useContext } from "react";
import DiaryItem from "./DiaryItem";
import { DiaryStateContext } from "./App";
const DiaryList = () => {
  const diaryList= useContext(DiaryStateContext);
  return (
    <div className="DiaryList_container">
    <h2>일기 리스트</h2>
    <h4>{diaryList.length}개의 일기가 있습니다.</h4>
    <div>
      {diaryList.map((it, idx) => (
        <DiaryItem key={`diaryitem_${it.id}`} {...it} />
      ))}
    </div>
  </div>
  );
};

DiaryList.defaultProps = {
  diaryList: []
};

export default DiaryList;
