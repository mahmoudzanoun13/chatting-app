import { MessagesList } from "@/components/chat/messages/messages-list";

export type Message = {
  id: string;
  text: string;
  sender: "me" | "other";
};

const messages: Message[] = [
  {
    id: "1",
    text: "Hello, Ahmed",
    sender: "me",
  },
  {
    id: "2",
    text: "Hello, Mohamed",
    sender: "other",
  },
  {
    id: "3",
    text: "How are you doing today, Ahmed?",
    sender: "me",
  },
  {
    id: "4",
    text: "I'm doing well, thank you, Mohamed!",
    sender: "other",
  },
  {
    id: "5",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam harum, quia nisi, hic sequi vero necessitatibus praesentium vel sed ratione sunt. Praesentium officiis incidunt aspernatur? Rem fugit dignissimos blanditiis omnis.",
    sender: "me",
  },
  {
    id: "6",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam harum, quia nisi, hic sequi vero necessitatibus praesentium vel sed ratione sunt. Praesentium officiis incidunt aspernatur? Rem fugit dignissimos blanditiis omnis.",
    sender: "other",
  },
  {
    id: "7",
    text: "مرحبا أحمد كيف حالك؟",
    sender: "me",
  },
  {
    id: "8",
    text: "أنا بخير الحمد لله، كيف حالك محمد؟",
    sender: "other",
  },
  {
    id: "9",
    text: "بخير الحمد لله",
    sender: "me",
  },
  {
    id: "10",
    text: "اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر",
    sender: "other",
  },
  {
    id: "11",
    text: "اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر اللهم إني أعوذ بك من العجز والكسل والجذام والجبن والهرم، وأعوذ بك من فتنة المحيا والممات، وأعوذ بك من عذاب القبر",
    sender: "me",
  },
  {
    id: "12",
    text: "It starts with English وبعد كده عربي",
    sender: "me",
  },
  {
    id: "13",
    text: "تبتدي عربي then English",
    sender: "me",
  },
];

type Props = {
  params: Promise<{ userId: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { userId } = await params;
  return <MessagesList userId={userId} messages={messages} />;
}
