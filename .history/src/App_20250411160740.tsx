import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { ProblemList } from "./components/ProblemList";
import { ProblemViewer } from "./components/ProblemViewer";
import { CodeEditor } from "./components/CodeEditor";
import { TestRunner } from "./components/TestRunner";
import { problems } from "./data/problems";
import "./index.css";
import {
  createDataItemSigner,
  dryrun,
  message,
  result,
} from "@permaweb/aoconnect";

const pId = "bfY91GzDgg0nDIcPRiaVQa91128a8hGYghI_TYQ9ZWU" ; 

export function App() {
  async function messageResult(
    gameProcess: string,
    tags: { name: string; value: string }[],
    data?: any
  ) {
    const res = await message({
      process: gameProcess,
      //@ts-ignore
      signer: createDataItemSigner(window.arweaveWallet),
      tags,
      data : JSON.stringify(data),
    });

    let { Messages, Spawns, Output, Error } = await result({
      message: res,
      process: gameProcess,
    });

    console.dir(
      { Messages, Spawns, Output, Error },
      { depth: Infinity, colors: true }
    );

    return { Messages, Spawns, Output, Error };
  }

  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null
  );
  const [userCode, setUserCode] = useState<Record<string, string>>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  // Load saved code and solved problems from localStorage on initial render
  useEffect(() => {
    const savedCode = localStorage.getItem("leetcode-clone-code");
    if (savedCode) {
      setUserCode(JSON.parse(savedCode));
    }

    const savedSolvedProblems = localStorage.getItem("leetcode-clone-solved");
    if (savedSolvedProblems) {
      setSolvedProblems(JSON.parse(savedSolvedProblems));
    }

    // Set first problem as default
    if (problems.length > 0 && !selectedProblemId) {
      setSelectedProblemId(problems[0].id);
    }

    // Add Google Font
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leetcode-clone-code", JSON.stringify(userCode));
  }, [userCode]);

  // Save solved problems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "leetcode-clone-solved",
      JSON.stringify(solvedProblems)
    );
  }, [solvedProblems]);

  const selectedProblem = problems.find(
    (problem) => problem.id === selectedProblemId
  );

  const handleCodeChange = (code: string) => {
    if (selectedProblemId) {
      setUserCode((prev) => ({
        ...prev,
        [selectedProblemId]: code,
      }));
    }
  };

  const seddata = async () => {
    console.log("Button clicked");

    if (currentPlayer) {
      console.log("Current player:", currentPlayer);

      // Wait for the player registration message to be sent to the AO process
      const { Messages, Spawns, Output, Error } = await messageResult(
        gameState.gameProcess,
        [
          {
            name: "Action",
            value: "Register-Player",
          },
          {
            name: "DisplayName",
            value: currentPlayer.name,
          },
        ]
      );

      if (Messages[0].Data === "Successfully registered to game.") {
        toast({
          title: "Successfully registered.",
          description: "Waiting for other players to join.",
        });

        //   setJoinedPlayers([...joinedPlayers, currentPlayer]);
        setMode("waiting");
      } else if (Messages[0].Data === "You are already registered.") {
        toast({
          title: "Player already registered.",
          description: "Please wait for other players to join.",
        });

        //   setJoinedPlayers([...joinedPlayers, currentPlayer]);
      } else return;

      const userRes = await dryrunResult(gameState.gameProcess, [
        {
          name: "Action",
          value: "Joined-Players",
        },
      ]);

      console.log("Joined users result", userRes);
      if (
        userRes.some(
          (user: { id: string; isCreator: number }) =>
            user.id === currentPlayer.id && user.isCreator === 1
        )
      ) {
        currentPlayer.isCreator = true;
      }
      setJoinedPlayers(userRes);
      setTimeout(() => {
        setMode("waiting");
      }, 1000);
    } else {
      toast({
        title: "Please login to play.",
        description: "Click on the connect button at the top.",
      });
    }
  };


 
  const getCurrentCode = () => {
    if (!selectedProblemId) return "";
    return userCode[selectedProblemId] || selectedProblem?.defaultCode || "";
  };

  const markProblemAsSolved = (problemId: string) => {
    if (!solvedProblems.includes(problemId)) {
      setSolvedProblems((prev) => [...prev, problemId]);
    }
  };

  // Determine which problems should be unlocked
  const getUnlockedProblems = () => {
    const result = new Set<string>();

    // First problem is always unlocked
    if (problems.length > 0) {
      result.add(problems[0].id);
    }

    // All solved problems are unlocked
    solvedProblems.forEach((id) => result.add(id));

    // The problem after the last solved problem is unlocked
    for (let i = 0; i < problems.length; i++) {
      if (solvedProblems.includes(problems[i].id) && i + 1 < problems.length) {
        result.add(problems[i + 1].id);
      }
    }

    return result;
  };

  const unlockedProblems = getUnlockedProblems();

  return (
    <>
    
    <div onClick={getLeaderBoard}>
      send msg
    </div>
    <Layout
      sidebar={
        <ProblemList
          problems={problems}
          selectedProblemId={selectedProblemId}
          onSelectProblem={setSelectedProblemId}
          solvedProblems={solvedProblems}
          unlockedProblems={Array.from(unlockedProblems)}
        />
      }
      showSidebar={showSidebar}
      toggleSidebar={() => setShowSidebar(!showSidebar)}
    >
      {selectedProblem ? (
        <div className="flex flex-col md:flex-row h-full">
          {/* Problem description panel */}
          <div className="md:w-1/2 h-full overflow-auto border-r">
            <ProblemViewer problem={selectedProblem} />
          </div>

          {/* Code editor and test runner panel */}
          <div className="md:w-1/2 h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                code={getCurrentCode()}
                onChange={handleCodeChange}
                language={selectedProblem.codeLanguage || "javascript"}
              />
            </div>

            <div className="border-t">
              <TestRunner
                problem={selectedProblem}
                userCode={getCurrentCode()}
                onTestSuccess={() => {
                  markProblemAsSolved(selectedProblem.id);
                  messageResult(
                    pId,
                    [
                      {
                        name: "Action",
                        value: "Submit",
                      },
                    ],
                    "question completed"
                  );
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            Select a problem from the sidebar to begin.
          </p>
        </div>
      )}
    </Layout>
    </>
  );
}

export default App;
