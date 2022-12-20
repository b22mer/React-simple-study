import { useEffect,useCallback, useMemo, useRef, useReducer } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

//1220. 두개의 파라미터 받음, 상태변화 직전 스테이트, 어떤 상태변화 액션객체
const reducer=(state, action)=>{

  switch(action.type){
    case 'INIT':{
      return action.data; 
    }
    
    case 'CREATE':{
      const created_date=new Date().getTime();
      const newItem={
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }
    
    case 'REMOVE':{
      return state.filter(it=> it.id!== action.targetId);
    }
    
    case 'EDIT':{
      return state.map(it=> it.id===action.targetId? {...it, content: action.newContent}:it);
    }
    
    default:
      return state;
    
    
    
  }

}



const App = () => {
  //1220.const [data, setData] = useState([]);
  //useReduce, 꼭 dispatch라고 사용, 상태변화 처리 reducer(우리가 직접 만들어야돼!)
  //복잡한 상태변화 로직을 밖으로!

  //dispatch는 함수형 업데이트 그런것 필요없이 호출을하면 현재 state를 reducer함수가
  //참조를 해서 자동으로 조정해줌, 디펜던시 어레이 걱정을 할필요가 없다.
  const [data, dispatch]=useReducer(reducer, []);



  
  
  
  const dataId = useRef(0);


  //1.
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });

    dispatch({type:"INIT", data:initData});
    //1220. setData(initData); reduce가 이제 할일임
  };

  useEffect(() => {
      getData();
  }, []);



  //1220.
  const onCreate = useCallback((author, content, emotion) => {
    //1220. 
    dispatch({type:"CREATE", data:{author,content, emotion, id: dataId.current}});
    
    //1220. 이제 필요가 없어짐
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current
    // };

    dataId.current += 1;
    
    //1220.
    //setData((data) => [newItem, ...data]);
  }, []);


  // 3. onCreate와 같이 최적화 시작
  const onRemove = useCallback((targetId) => {
    //1220. 
    dispatch({type:"REMOVE", targetId});
    
    //1220. 
    //setData에 전달되는 파라미터에 최신스테이가 전달되는것이기에!
    //setData(data=> data.filter((it) => it.id !== targetId));
  },[]);


  // 4.
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type:"EDIT", targetId,newContent});

    //1220. 
    // setData((data)=>
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  },[]);

  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">

      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};
export default App;
