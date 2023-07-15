import {readFileData} from "./api/feedback";

function feedbackPage(props){

  return <>
    { props.feedbackItems}
  </>
}

export async function getStaticProps(){
  // To fetch data from external APIs we use fetch() or ...
  // To fetch data from internal api route, we should not do an internal API call

  // All the logic in the functions used to generate the result of the API,
  // must be exported and reused here.
  // We don't send request, we execute the code!

  const data = readFileData();

  return {
    props:{
      feedbackItems: JSON.stringify(data)
    }
  }

}
export default feedbackPage;