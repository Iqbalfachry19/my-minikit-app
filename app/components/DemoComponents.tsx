"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification } from "@coinbase/onchainkit/minikit";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

function Card({ title, children, className = "", onClick }: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTab: (tab: string) => void;
};

export function Features({ setActiveTab }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Minimalistic and beautiful UI design
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Responsive layout for all devices
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Dark mode support
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              OnchainKit integration
            </span>
          </li>
        </ul>
        <Button variant="outline" onClick={() => setActiveTab("home")}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
}

export function Home() {
  return (
    <div className="space-y-6 animate-fade-in">
      <TicTacToe />
      <TransactionCard />
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right" | "x" | "o";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    x: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>X</title>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    o: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>O</title>
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}

type Player = "X" | "O" | null;
type Board = Player[];

function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isBotMode, setIsBotMode] = useState(false);
  const [isBotThinking, setIsBotThinking] = useState(false);

  // Cek pemenang
  const checkWinner = (board: Board): Player => {
    const lines = [
      [0, 1, 2], // baris 1
      [3, 4, 5], // baris 2
      [6, 7, 8], // baris 3
      [0, 3, 6], // kolom 1
      [1, 4, 7], // kolom 2
      [2, 5, 8], // kolom 3
      [0, 4, 8], // diagonal 1
      [2, 4, 6], // diagonal 2
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  // Cek apakah papan penuh (seri)
  const isBoardFull = (board: Board): boolean => {
    return board.every((cell) => cell !== null);
  };

  // Fungsi bot untuk membuat langkah
  const makeBotMove = (currentBoard: Board): number => {
    // Langkah 1: Coba menangkan jika memungkinkan
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (checkWinner(testBoard) === "O") {
          return i;
        }
      }
    }

    // Langkah 2: Blokir pemain jika pemain akan menang
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (checkWinner(testBoard) === "X") {
          return i;
        }
      }
    }

    // Langkah 3: Ambil posisi tengah jika kosong
    if (!currentBoard[4]) {
      return 4;
    }

    // Langkah 4: Ambil sudut yang tersedia
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((corner) => !currentBoard[corner]);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    // Langkah 5: Ambil sisi yang tersedia
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter((side) => !currentBoard[side]);
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    // Fallback: ambil posisi acak yang tersedia
    const availableMoves = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  // Handle klik pada cell
  const handleCellClick = (index: number) => {
    if (board[index] || gameOver || isBotThinking) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      return;
    } else if (isBoardFull(newBoard)) {
      setWinner(null); // seri
      setGameOver(true);
      return;
    }

    // Jika mode bot dan pemain X sudah main, giliran bot (O)
    if (isBotMode && currentPlayer === "X") {
      setCurrentPlayer("O");
      setIsBotThinking(true);

      // Bot membuat langkah setelah delay kecil
      setTimeout(() => {
        const botMove = makeBotMove(newBoard);
        const botBoard = [...newBoard];
        botBoard[botMove] = "O";
        setBoard(botBoard);
        setIsBotThinking(false);

        const botWinner = checkWinner(botBoard);
        if (botWinner) {
          setWinner(botWinner);
          setGameOver(true);
        } else if (isBoardFull(botBoard)) {
          setWinner(null);
          setGameOver(true);
        } else {
          setCurrentPlayer("X");
        }
      }, 800); // delay 800ms untuk efek "berpikir"
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameOver(false);
    setIsBotThinking(false);
  };

  // Toggle mode permainan
  const toggleGameMode = () => {
    resetGame();
    setIsBotMode(!isBotMode);
  };

  // Render cell
  const renderCell = (index: number) => {
    const value = board[index];
    return (
      <button
        key={index}
        className="w-20 h-20 border-2 border-[var(--app-accent)] bg-[var(--app-card-bg)] hover:bg-[var(--app-accent-light)] transition-colors duration-200 flex items-center justify-center text-2xl font-bold text-[var(--app-foreground)] disabled:cursor-not-allowed"
        onClick={() => handleCellClick(index)}
        disabled={!!value || gameOver || isBotThinking}
      >
        {value === "X" && (
          <Icon name="x" size="lg" className="text-[var(--app-accent)]" />
        )}
        {value === "O" && (
          <Icon name="o" size="lg" className="text-[var(--app-accent)]" />
        )}
      </button>
    );
  };

  // Status game
  const getGameStatus = () => {
    if (winner) {
      if (isBotMode && winner === "O") {
        return "🤖 Bot Menang!";
      } else if (isBotMode && winner === "X") {
        return "🎉 Anda Menang!";
      } else {
        return `🎉 Pemenang: ${winner}`;
      }
    } else if (gameOver) {
      return "🤝 Permainan Seri!";
    } else if (isBotThinking) {
      return "🤖 Bot sedang berpikir...";
    } else if (isBotMode) {
      return currentPlayer === "X" ? "Giliran Anda (X)" : "Giliran Bot (O)";
    } else {
      return `Giliran: ${currentPlayer}`;
    }
  };

  return (
    <Card title="TicTacToe">
      <div className="flex flex-col items-center space-y-4">
        {/* Mode Selection */}
        <div className="flex space-x-2">
          <Button
            variant={!isBotMode ? "primary" : "outline"}
            size="sm"
            onClick={toggleGameMode}
            disabled={isBotThinking}
          >
            👥 VS Pemain
          </Button>
          <Button
            variant={isBotMode ? "primary" : "outline"}
            size="sm"
            onClick={toggleGameMode}
            disabled={isBotThinking}
          >
            🤖 VS Bot
          </Button>
        </div>

        {/* Status Game */}
        <div className="text-lg font-medium text-[var(--app-foreground)] text-center min-h-[2rem]">
          {getGameStatus()}
        </div>

        {/* Papan Permainan */}
        <div className="grid grid-cols-3 gap-2">
          {Array(9)
            .fill(null)
            .map((_, index) => renderCell(index))}
        </div>

        {/* Tombol Reset */}
        <Button
          variant="outline"
          onClick={resetGame}
          className="mt-4"
          disabled={isBotThinking}
        >
          Reset Game
        </Button>
      </div>
    </Card>
  );
}

function TransactionCard() {
  const { address } = useAccount();

  // Example transaction call - sending 0 ETH to self
  const calls = useMemo(
    () =>
      address
        ? [
            {
              to: address,
              data: "0x" as `0x${string}`,
              value: BigInt(0),
            },
          ]
        : [],
    [address],
  );

  const sendNotification = useNotification();

  const handleSuccess = useCallback(
    async (response: TransactionResponse) => {
      const transactionHash = response.transactionReceipts[0].transactionHash;

      console.log(`Transaction successful: ${transactionHash}`);

      await sendNotification({
        title: "Congratulations!",
        body: `You sent your a transaction, ${transactionHash}!`,
      });
    },
    [sendNotification],
  );

  return (
    <Card title="Get your NFT">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Experience the power of seamless sponsored transactions with{" "}
          <a
            href="https://onchainkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0052FF] hover:underline"
          >
            OnchainKit
          </a>
          .
        </p>

        <div className="flex flex-col items-center">
          {address ? (
            <Transaction
              calls={calls}
              onSuccess={handleSuccess}
              onError={(error: TransactionError) =>
                console.error("Transaction failed:", error)
              }
            >
              <TransactionButton className="text-white text-md" />
              <TransactionStatus>
                <TransactionStatusAction />
                <TransactionStatusLabel />
              </TransactionStatus>
              <TransactionToast className="mb-4">
                <TransactionToastIcon />
                <TransactionToastLabel />
                <TransactionToastAction />
              </TransactionToast>
            </Transaction>
          ) : (
            <p className="text-yellow-400 text-sm text-center mt-2">
              Connect your wallet to send a transaction
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
