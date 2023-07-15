import { useRef, useState } from "react";

function HomePage() {
  const [feedback, setFeedback] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        text: feedback,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json()).then(data => console.log(data))
  };

  const getDataHandler = (e) =>{
    e.preventDefault();

    fetch("/api/feedback").then(response => response.json()).then(data => setFeedback(data.message))

  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor={"email"}>Email</label>
          <input type="email" id={"email"} ref={emailRef} />
        </div>
        <div>
          <label htmlFor={"email"}>feedback</label>
          <textarea id={"feedback"} rows={5} ref={feedbackRef} />
        </div>
        <button>Submit</button>
      </form>
      <button onClick={getDataHandler}>Get data</button>
      <div>
        {feedback && (JSON.stringify(feedback))}
      </div>
    </div>
  );
}

export default HomePage;
