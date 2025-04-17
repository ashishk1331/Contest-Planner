import CodeChefLogo from "@/logos/Codechef";
import CodeForces from "@/logos/CodeForces";
import GeeksForGeeksLogo from "@/logos/GeeksForGeeks";
import Leetcode from "@/logos/Leetcode";

type PlatformLogoProps = {
	platform: string;
};

export default function PlatformLogo({ platform }: PlatformLogoProps) {
	switch (platform) {
		case "leetcode":
			return <Leetcode />;
		case "codeforces":
			return <CodeForces />;
		case "codechef":
			return <CodeChefLogo />;
		case "geeksforgeeks":
			return <GeeksForGeeksLogo />;
		default:
			return null;
	}
}
