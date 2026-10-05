import Home from "../../page";

type EventPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;

    return <Home initialEventId={id} />;
}