function UserProfilePage(props){

  return <h1>Name:{props.username } </h1>


}



export default UserProfilePage;

// Nothing crazy.
// Two key features: 1. Runs on every request
// 2. We have access to req and res objects
export async function getServerSideProps (context){

  const {params, req, res} = context;

  // The return object is as same as getStaticProps.
  return {
    props: {
      username: 'Ali'
    }
  };
}