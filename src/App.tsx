// import { useState } from "react";

import { useState } from "react";

// const Reply = ({ reply }) => {
//   return (
//     <div className="mb-4">
//       <div className="shadow-md rounded-md p-4 mb-4 bg-red-500 w-[200px]">
//         {reply}
//       </div>
//       <form>
//         <input type="text" placeholder="reply..." />
//       </form>
//     </div>
//   );
// };
// const Comment = ({ comment, postedComments, setPostedComments }) => {
//   const [reply, setReply] = useState("");
//   const [replies, setReplies] = useState(comment.replies);
//   const addReply = () => {
//     setPostedComments((prev) => {
//       return prev.map((p) => {
//         if (p.id !== comment.id) return p;
//         else
//           return {
//             id: p.id,
//             comment: p.comment,
//             replies: [
//               ...p.replies,
//               {
//                 id: crypto.randomUUID(),
//                 replies: [],
//                 reply: reply,
//               },
//             ],
//           };
//       });
//     });
//     setReply("");
//   };
//   return (
//     <div className="shadow-md rounded-md p-4 mb-4 bg-red-500 w-[200px]">
//       <div>{comment.comment}</div>
//       <div>
//         <div>
//           {replies.map((reply) => {
//             return <Reply reply={reply.reply} key={crypto.randomUUID()} />;
//           })}
//         </div>
//         <div>
//           <form>
//             <input
//               type="text"
//               placeholder="Enter a reply to comment..."
//               value={reply}
//               onChange={(e) => setReply(e.target.value)}
//             />
//             <button type="button" onClick={addReply}>
//               Reply
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [comment, setComment] = useState("");
//   const [postedComments, setPostedComments] = useState([]); // Use state for posted comments
//   console.log(postedComments);
//   const addNewComment = () => {
//     setPostedComments([
//       ...postedComments,
//       {
//         id: crypto.randomUUID(),
//         comment: comment,
//         replies: [],
//       },
//     ]);
//     setComment("");
//   };

//   return (
//     <div>
//       <div>
//         <h1>Posted Comments</h1>
//         <div>
//           {postedComments.map((postedComment) => (
//             <Comment
//               key={crypto.randomUUID()}
//               setPostedComments={setPostedComments}
//               comment={postedComment}
//               postedComments={postedComments}
//             />
//           ))}
//         </div>
//       </div>
//       <div>
//         <form>
//           <input
//             type="text"
//             placeholder="Enter a new comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button type="button" onClick={addNewComment}>
//             Comment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default App;

const Comment = ({ comment, level }) => {
  console.log(level + 1 + "px");
  if (comment) {
    return (
      <div style={{ marginLeft: level * 30 + "px", marginTop: "10px" }}>
        <div>
          <div className="w-[200px] flex gap-4 p-4 bg-red-400 rounded-md shadow-md">
            <div className="font-bold text-white">{comment.user}</div>
            <div>{comment.text}</div>
          </div>
          <div>
            <input type="text" placeholder="Reply..." />
          </div>
        </div>
        <Comment comment={comment.reply} level={level + 1} />
      </div>
    );
  }
};

const App = () => {
  const [comment, setComment] = useState({
    text: "This is the comment 1.",
    user: "Riyaj Bhandari",
    reply: {
      text: "This is the reply 1.",
      user: "Ramesh Shrestha",
      reply: {
        text: "This is the reply to reply1.",
        user: "Gopi nath",
        reply: {
          text: "This is the reply to reply1 reply.",
          user: "Ram nath Nepal",
          reply: undefined,
        },
      },
    },
  });
  function addNewReply() {
    let temp = comment;
    function helper(temp) {
      if (temp.reply === undefined) {
        temp.reply = {
          text: "From the function.",
          user: "Haris Rauf",
        };
        return;
      } else helper(temp.reply);
    }
    helper(temp);
    setComment({ ...temp });
  }
  return (
    <div>
      <Comment comment={comment} level={0} />
      <div>
        <button onClick={addNewReply}>Add new reply</button>
      </div>
    </div>
  );
};

export default App;
