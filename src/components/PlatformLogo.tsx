import CodeChefLogo from "@/logos/Codechef";
import CodeForces from "@/logos/CodeForces";
import GeeksForGeeksLogo from "@/logos/GeeksForGeeks";
import Leetcode from "@/logos/Leetcode";
import AtCoder from "@/logos/AtCoder";

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
		case "atcoder":
			return <AtCoder />;
		default:
			return null;
	}
}
