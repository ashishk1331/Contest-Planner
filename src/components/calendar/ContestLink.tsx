import PlatformLogo from "@/components/PlatformLogo";
import { type Contest } from "@/types";

export default function ContestLink({ contest }: { contest: Contest }) {
	return (
		<>
			<PlatformLogo platform={contest.platform} />
			<a
				href={contest.contestUrl}
				target="_blank"
				rel="noreferrer"
				className="underline underline-offset-2"
			>
				{contest.contestName}
			</a>
		</>
	);
}
