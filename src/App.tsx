import { useRef, useState } from "react";
const initialComments = [
  {
    name: "momsfav_01",
    id: 1,
    title: "Comment1",
    reply: [
      {
        name: "pasang_12",
        id: 11,
        title: "C1 R1",
        reply: [
          {
            name: "gopu_12",
            id: 111,
            title: "C1 R11",
            reply: [],
          },
          {
            name: "anushka_sen",
            id: 112,
            title: "C1 R12",
            reply: [],
          },
        ],
      },
      {
        name: "rii",
        id: 12,
        title: "C1 R12",
        reply: [
          {
            name: "bhoju_123",
            id: 121,
            title: "C1 R21",
            reply: [],
          },
          {
            name: "ramesh_123",
            id: 122,
            title: "C1 R22",
            reply: [],
          },
        ],
      },
    ],
  },
  {
    name: "harish_rauf",
    id: 2,
    title: "Comment2",
    reply: [
      {
        name: "krishna_123",
        id: 21,
        title: "C2 R1",
        reply: [
          {
            name: "shyam_koirala",
            id: 211,
            title: "C1 R11",
            reply: [],
          },
          {
            name: "kalyan",
            id: 212,
            title: "C1 R12",
            reply: [],
          },
        ],
      },
      {
        name: "ritika",
        id: 22,
        title: "C2 R2",
        reply: [
          {
            name: "mahesh",
            id: 221,
            title: "C2 R21",
            reply: [],
          },
          {
            name: "hiru",
            id: 222,
            title: "C2 R22",
            reply: [],
          },
        ],
      },
    ],
  },
];
const Comment = ({ comment, level, helper }) => {
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const replyRef = useRef();
  return (
    <div
      style={{
        marginLeft: level * 30 + "px",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      <div
        className="bg-red-500 flex items-center gap-4 text-white p-4 shadow-md "
        style={{ width: "1000px" }}
      >
        <div className="font-bold">{comment.name}</div>
        <div
          style={{
            padding: "10px",
            background: "green",
            borderRadius: "10px",
            minWidth: "400px",
          }}
        >
          {comment.title}
        </div>
        <div>
          <button
            onClick={() => setShow((p) => !p)}
            className="bg-green-500 rounded-md p-2"
          >
            show
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setShowReply((p) => !p);
            }}
            className="bg-green-500 rounded-md p-2"
          >
            reply
          </button>
        </div>
      </div>
      {show && (
        <div>
          {comment.reply.map((comm) => {
            return (
              <Comment
                comment={comm}
                key={comm.id}
                level={level + 1}
                helper={helper}
              />
            );
          })}
        </div>
      )}
      {(showReply || show) && (
        <div
          className="py-4"
          style={{ marginTop: "16px", marginBottom: "16px" }}
        >
          <input placeholder="reply...." className="border" ref={replyRef} />
          <button
            className="p-2 bg-green-500"
            onClick={() => {
              const replyText = replyRef.current.value;
              helper(comment.id, replyText);
              replyRef.current.value = "";
              setShow(true);
            }}
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

const user = "riyaj_b1";
const App = () => {
  const [comments, setComments] = useState(initialComments);
  function helper(id, replyText) {
    let temp = comments;
    let found = false;
    function findById(id, localComments, replyText) {
      for (let comment of localComments) {
        if (!found) {
          if (comment.id === id) {
            comment.reply.unshift({
              name: user,
              id: Math.floor(Math.random() * 10000),
              title: replyText,
              reply: [],
            });

            found = true;
            return;
          }
          findById(id, comment.reply, replyText);
        }
      }
    }
    findById(id, comments, replyText);
    setComments([...temp]);
  }

  return (
    <>
      <h1 className="text-center font-bold" style={{ fontSize: "50px" }}>
        Nested Comment System By RB(rii98 github)
      </h1>
      <div>
        {comments.map((comment) => {
          return (
            <div
              className="shadow-md rounded-md p-6"
              style={{ background: "black" }}
            >
              <Comment
                comments={comments}
                comment={comment}
                key={comment.id}
                level={0}
                helper={helper}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
