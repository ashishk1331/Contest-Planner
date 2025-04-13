import { compareAsc, format } from "date-fns";
import Leetcode from "../logos/Leetcode";
import CodeForces from "../logos/CodeForces";

const contests = [
	{
		_id: "67ef675275f6e73b030bce16",
		contestCode: "gfg-weekly-204-rated-contest",
		contestDuration: 5400,
		contestEndDate: "2025-04-27T15:00:00.000Z",
		contestName: "GfG Weekly - 204 [Rated Contest]",
		contestRegistrationEndDate: "2025-04-27T15:00:00.000Z",
		contestRegistrationStartDate: "2025-04-27T13:30:00.000Z",
		contestSlug: "gfg-weekly-204-rated-contest",
		contestStartDate: "2025-04-27T13:30:00.000Z",
		contestType: "Weekly",
		contestUrl:
			"https://practice.geeksforgeeks.org/contest/gfg-weekly-204-rated-contest",
		platform: "geeksforgeeks",
	},
	{
		_id: "67f8a1d075f6e73b034a1bbe",
		contestCode: "abc403",
		contestDuration: 6000,
		contestEndDate: "2025-04-27T13:40:00.000Z",
		contestName: "AtCoder Beginner Contest 403",
		contestRegistrationEndDate: "2025-04-27T13:40:00.000Z",
		contestRegistrationStartDate: "2025-04-27T12:00:00.000Z",
		contestSlug: "abc403",
		contestStartDate: "2025-04-27T12:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/abc403",
		platform: "atcoder",
	},
	{
		_id: "67fb44d075f6e73b035eed95",
		contestCode: "biweekly-contest-155",
		contestDuration: 5400,
		contestEndDate: "2025-04-26T16:00:00.000Z",
		contestName: "Biweekly Contest 155",
		contestRegistrationEndDate: "2025-04-26T14:30:00.000Z",
		contestRegistrationStartDate: "2025-04-12T16:00:00.000Z",
		contestSlug: "biweekly-contest-155",
		contestStartDate: "2025-04-26T14:30:00.000Z",
		contestType: "Biweekly",
		contestUrl: "https://leetcode.com/contest/biweekly-contest-155/",
		platform: "leetcode",
	},
	{
		_id: "67f4ad5775f6e73b03303fcc",
		contestCode: "2098",
		contestDuration: 9000,
		contestEndDate: "2025-04-26T11:05:00.000Z",
		contestName: "Codeforces Round (Div. 2)",
		contestRegistrationEndDate: "2025-04-26T11:05:00.000Z",
		contestRegistrationStartDate: "2025-04-26T08:35:00.000Z",
		contestSlug: "Codeforces Round (Div. 2)",
		contestStartDate: "2025-04-26T08:35:00.000Z",
		contestType: "CF",
		contestUrl: "https://codeforces.com/contest/2098",
		platform: "codeforces",
	},
	{
		_id: "67f4ad5775f6e73b03303fd4",
		contestCode: "2097",
		contestDuration: 9000,
		contestEndDate: "2025-04-26T11:05:00.000Z",
		contestName: "Codeforces Round (Div. 1)",
		contestRegistrationEndDate: "2025-04-26T11:05:00.000Z",
		contestRegistrationStartDate: "2025-04-26T08:35:00.000Z",
		contestSlug: "Codeforces Round (Div. 1)",
		contestStartDate: "2025-04-26T08:35:00.000Z",
		contestType: "CF",
		contestUrl: "https://codeforces.com/contest/2097",
		platform: "codeforces",
	},
	{
		_id: "67e389d175f6e73b03b93a8d",
		contestCode: "ahc046",
		contestDuration: 14400,
		contestEndDate: "2025-04-26T10:00:00.000Z",
		contestName:
			"BrainPad Programming Contest 2025 （AtCoder Heuristic Contest 046）",
		contestRegistrationEndDate: "2025-04-26T10:00:00.000Z",
		contestRegistrationStartDate: "2025-04-26T06:00:00.000Z",
		contestSlug: "ahc046",
		contestStartDate: "2025-04-26T06:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/ahc046",
		platform: "atcoder",
	},
	{
		_id: "67f7505175f6e73b03416f04",
		contestCode: "START183",
		contestDuration: 7200,
		contestEndDate: "2025-04-23T16:30:00.000Z",
		contestName: "Starters 183",
		contestRegistrationEndDate: "2025-04-23T16:30:00.000Z",
		contestRegistrationStartDate: "2025-04-23T14:30:00.000Z",
		contestSlug: "START183",
		contestStartDate: "2025-04-23T14:30:00.000Z",
		contestType: "Starters",
		contestUrl: "https://www.codechef.com/START183",
		platform: "codechef",
	},
	{
		_id: "67f5fed075f6e73b0338b134",
		contestCode: "2103",
		contestDuration: 7200,
		contestEndDate: "2025-04-21T16:35:00.000Z",
		contestName: "Codeforces Round (Div. 2)",
		contestRegistrationEndDate: "2025-04-21T16:35:00.000Z",
		contestRegistrationStartDate: "2025-04-21T14:35:00.000Z",
		contestSlug: "Codeforces Round (Div. 2)",
		contestStartDate: "2025-04-21T14:35:00.000Z",
		contestType: "CF",
		contestUrl: "https://codeforces.com/contest/2103",
		platform: "codeforces",
	},
	{
		_id: "67c688d175f6e73b03fbc5cf",
		contestCode: "job-a-thon-44-hiring-challenge",
		contestDuration: 9000,
		contestEndDate: "2025-04-21T17:00:00.000Z",
		contestName: "Job-A-thon 44 Hiring Challenge",
		contestRegistrationEndDate: "2025-04-21T17:00:00.000Z",
		contestRegistrationStartDate: "2025-04-21T14:30:00.000Z",
		contestSlug: "job-a-thon-44-hiring-challenge",
		contestStartDate: "2025-04-21T14:30:00.000Z",
		contestType: "GFG",
		contestUrl:
			"https://practice.geeksforgeeks.org/contest/job-a-thon-44-hiring-challenge",
		platform: "geeksforgeeks",
	},
	{
		_id: "67ef675275f6e73b030bce15",
		contestCode: "gfg-weekly-203-rated-contest",
		contestDuration: 5400,
		contestEndDate: "2025-04-20T15:00:00.000Z",
		contestName: "GfG Weekly - 203 [Rated Contest]",
		contestRegistrationEndDate: "2025-04-20T15:00:00.000Z",
		contestRegistrationStartDate: "2025-04-20T13:30:00.000Z",
		contestSlug: "gfg-weekly-203-rated-contest",
		contestStartDate: "2025-04-20T13:30:00.000Z",
		contestType: "Weekly",
		contestUrl:
			"https://practice.geeksforgeeks.org/contest/gfg-weekly-203-rated-contest",
		platform: "geeksforgeeks",
	},
	{
		_id: "67ce71d075f6e73b03294cba",
		contestCode: "agc072",
		contestDuration: 10800,
		contestEndDate: "2025-04-20T15:00:00.000Z",
		contestName: "AtCoder Grand Contest 072",
		contestRegistrationEndDate: "2025-04-20T15:00:00.000Z",
		contestRegistrationStartDate: "2025-04-20T12:00:00.000Z",
		contestSlug: "agc072",
		contestStartDate: "2025-04-20T12:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/agc072",
		platform: "atcoder",
	},
	{
		_id: "67fb44d075f6e73b035eed96",
		contestCode: "weekly-contest-446",
		contestDuration: 5400,
		contestEndDate: "2025-04-20T04:00:00.000Z",
		contestName: "Weekly Contest 446",
		contestRegistrationEndDate: "2025-04-20T02:30:00.000Z",
		contestRegistrationStartDate: "2025-04-13T04:00:00.000Z",
		contestSlug: "weekly-contest-446",
		contestStartDate: "2025-04-20T02:30:00.000Z",
		contestType: "Weekly",
		contestUrl: "https://leetcode.com/contest/weekly-contest-446/",
		platform: "leetcode",
	},
	{
		_id: "67ea215075f6e73b03e7acd1",
		contestCode: "2096",
		contestDuration: 7200,
		contestEndDate: "2025-04-19T16:35:00.000Z",
		contestName:
			"Neowise Labs Contest 1 (Codeforces Round 1018, Div. 1 + Div. 2)",
		contestRegistrationEndDate: "2025-04-19T16:35:00.000Z",
		contestRegistrationStartDate: "2025-04-19T14:35:00.000Z",
		contestSlug:
			"Neowise Labs Contest 1 (Codeforces Round 1018, Div. 1 + Div. 2)",
		contestStartDate: "2025-04-19T14:35:00.000Z",
		contestType: "CF",
		contestUrl: "https://codeforces.com/contest/2096",
		platform: "codeforces",
	},
	{
		_id: "67e4db5075f6e73b03c28d4c",
		contestCode: "abc402",
		contestDuration: 6000,
		contestEndDate: "2025-04-19T13:40:00.000Z",
		contestName:
			"Tokio Marine & Nichido Fire Insurance Programming Contest 2025  (AtCoder Beginner Contest 402)",
		contestRegistrationEndDate: "2025-04-19T13:40:00.000Z",
		contestRegistrationStartDate: "2025-04-19T12:00:00.000Z",
		contestSlug: "abc402",
		contestStartDate: "2025-04-19T12:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/abc402",
		platform: "atcoder",
	},
	{
		_id: "67ee15d075f6e73b0302e824",
		contestCode: "START182",
		contestDuration: 7200,
		contestEndDate: "2025-04-16T16:30:00.000Z",
		contestName: "Starters 182",
		contestRegistrationEndDate: "2025-04-16T16:30:00.000Z",
		contestRegistrationStartDate: "2025-04-16T14:30:00.000Z",
		contestSlug: "START182",
		contestStartDate: "2025-04-16T14:30:00.000Z",
		contestType: "Starters",
		contestUrl: "https://www.codechef.com/START182",
		platform: "codechef",
	},
	{
		_id: "67e77e5075f6e73b03d37a11",
		contestCode: "2094",
		contestDuration: 8100,
		contestEndDate: "2025-04-13T17:50:00.000Z",
		contestName: "Codeforces Round 1017 (Div. 4)",
		contestRegistrationEndDate: "2025-04-13T17:50:00.000Z",
		contestRegistrationStartDate: "2025-04-13T15:35:00.000Z",
		contestSlug: "Codeforces Round 1017 (Div. 4)",
		contestStartDate: "2025-04-13T15:35:00.000Z",
		contestType: "ICPC",
		contestUrl: "https://codeforces.com/contest/2094",
		platform: "codeforces",
	},
	{
		_id: "67e2385175f6e73b03b04b12",
		contestCode: "gfg-weekly-202-rated-contest",
		contestDuration: 5400,
		contestEndDate: "2025-04-13T15:00:00.000Z",
		contestName: "GfG Weekly - 202 [Rated Contest]",
		contestRegistrationEndDate: "2025-04-13T15:00:00.000Z",
		contestRegistrationStartDate: "2025-04-13T13:30:00.000Z",
		contestSlug: "gfg-weekly-202-rated-contest",
		contestStartDate: "2025-04-13T13:30:00.000Z",
		contestType: "Weekly",
		contestUrl:
			"https://practice.geeksforgeeks.org/contest/gfg-weekly-202-rated-contest",
		platform: "geeksforgeeks",
	},
	{
		_id: "67f20a5075f6e73b031f0def",
		contestCode: "weekly-contest-445",
		contestDuration: 5400,
		contestEndDate: "2025-04-13T04:00:00.000Z",
		contestName: "Weekly Contest 445",
		contestRegistrationEndDate: "2025-04-13T02:30:00.000Z",
		contestRegistrationStartDate: "2025-04-06T04:00:00.000Z",
		contestSlug: "weekly-contest-445",
		contestStartDate: "2025-04-13T02:30:00.000Z",
		contestType: "Weekly",
		contestUrl: "https://leetcode.com/contest/weekly-contest-445/",
		platform: "leetcode",
	},
	{
		_id: "67f5fed175f6e73b0338b1a7",
		contestCode: "gfg-gate-scholarship-test-2026",
		contestDuration: 86340,
		contestEndDate: "2025-04-13T18:29:00.000Z",
		contestName: "GfG GATE Scholarship Test 2026",
		contestRegistrationEndDate: "2025-04-13T18:29:00.000Z",
		contestRegistrationStartDate: "2025-04-12T18:30:00.000Z",
		contestSlug: "gfg-gate-scholarship-test-2026",
		contestStartDate: "2025-04-12T18:30:00.000Z",
		contestType: "GFG",
		contestUrl:
			"https://practice.geeksforgeeks.org/contest/gfg-gate-scholarship-test-2026",
		platform: "geeksforgeeks",
	},
	{
		_id: "67e8cfd075f6e73b03df4d58",
		contestCode: "biweekly-contest-154",
		contestDuration: 5400,
		contestEndDate: "2025-04-12T16:00:00.000Z",
		contestName: "Biweekly Contest 154",
		contestRegistrationEndDate: "2025-04-12T14:30:00.000Z",
		contestRegistrationStartDate: "2025-03-29T16:00:00.000Z",
		contestSlug: "biweekly-contest-154",
		contestStartDate: "2025-04-12T14:30:00.000Z",
		contestType: "Biweekly",
		contestUrl: "https://leetcode.com/contest/biweekly-contest-154/",
		platform: "leetcode",
	},
	{
		_id: "67e389d075f6e73b03b93a7e",
		contestCode: "abc401",
		contestDuration: 6000,
		contestEndDate: "2025-04-12T13:40:00.000Z",
		contestName: "AtCoder Beginner Contest 401",
		contestRegistrationEndDate: "2025-04-12T13:40:00.000Z",
		contestRegistrationStartDate: "2025-04-12T12:00:00.000Z",
		contestSlug: "abc401",
		contestStartDate: "2025-04-12T12:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/abc401",
		platform: "atcoder",
	},
	{
		_id: "67e4db5075f6e73b03c28dc9",
		contestCode: "START181",
		contestDuration: 9000,
		contestEndDate: "2025-04-09T17:00:00.000Z",
		contestName: "Starters 181 (Rated for all)",
		contestRegistrationEndDate: "2025-04-09T17:00:00.000Z",
		contestRegistrationStartDate: "2025-04-09T14:30:00.000Z",
		contestSlug: "START181",
		contestStartDate: "2025-04-09T14:30:00.000Z",
		contestType: "Starters",
		contestUrl: "https://www.codechef.com/START181",
		platform: "codechef",
	},
	{
		_id: "67e0e6d075f6e73b03a71e2e",
		contestCode: "2093",
		contestDuration: 8100,
		contestEndDate: "2025-04-08T16:50:00.000Z",
		contestName: "Codeforces Round 1016 (Div. 3)",
		contestRegistrationEndDate: "2025-04-08T16:50:00.000Z",
		contestRegistrationStartDate: "2025-04-08T14:35:00.000Z",
		contestSlug: "Codeforces Round 1016 (Div. 3)",
		contestStartDate: "2025-04-08T14:35:00.000Z",
		contestType: "ICPC",
		contestUrl: "https://codeforces.com/contest/2093",
		platform: "codeforces",
	},
	{
		_id: "67da4f5075f6e73b03705f1b",
		contestCode: "2087",
		contestDuration: 9000,
		contestEndDate: "2025-04-07T17:05:00.000Z",
		contestName: "Kotlin Heroes: Episode 12",
		contestRegistrationEndDate: "2025-04-07T17:05:00.000Z",
		contestRegistrationStartDate: "2025-04-07T14:35:00.000Z",
		contestSlug: "Kotlin Heroes: Episode 12",
		contestStartDate: "2025-04-07T14:35:00.000Z",
		contestType: "ICPC",
		contestUrl: "https://codeforces.com/contest/2087",
		platform: "codeforces",
	},
	{
		_id: "67d114d175f6e73b03386777",
		contestCode: "gfg-weekly-201-rated-contest",
		contestDuration: 5400,
		contestEndDate: "2025-04-06T15:00:00.000Z",
		contestName: "GfG Weekly - 201 [Rated Contest]",
		contestRegistrationEndDate: "2025-04-06T15:00:00.000Z",
		contestRegistrationStartDate: "2025-04-06T13:30:00.000Z",
		contestSlug: "gfg-weekly-201-rated-contest",
		contestStartDate: "2025-04-06T13:30:00.000Z",
		contestType: "Weekly",
		contestUrl:
			"https://practice.geeksforgeeks.org/contest/gfg-weekly-201-rated-contest",
		platform: "geeksforgeeks",
	},
	{
		_id: "67d114d075f6e73b03386752",
		contestCode: "arc196",
		contestDuration: 9000,
		contestEndDate: "2025-04-06T14:30:00.000Z",
		contestName: "AtCoder Regular Contest 196 (Div. 1)",
		contestRegistrationEndDate: "2025-04-06T14:30:00.000Z",
		contestRegistrationStartDate: "2025-04-06T12:00:00.000Z",
		contestSlug: "arc196",
		contestStartDate: "2025-04-06T12:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/arc196",
		platform: "atcoder",
	},
	{
		_id: "67e8cfd075f6e73b03df4d5c",
		contestCode: "weekly-contest-444",
		contestDuration: 5400,
		contestEndDate: "2025-04-06T04:00:00.000Z",
		contestName: "Weekly Contest 444",
		contestRegistrationEndDate: "2025-04-06T02:30:00.000Z",
		contestRegistrationStartDate: "2025-03-30T04:00:00.000Z",
		contestSlug: "weekly-contest-444",
		contestStartDate: "2025-04-06T02:30:00.000Z",
		contestType: "Weekly",
		contestUrl: "https://leetcode.com/contest/weekly-contest-444/",
		platform: "leetcode",
	},
	{
		_id: "67d3b7d075f6e73b0347a6d3",
		contestCode: "2084",
		contestDuration: 10800,
		contestEndDate: "2025-04-05T17:35:00.000Z",
		contestName: "Teza Round 1 (Codeforces Round 1015, Div. 1 + Div. 2)",
		contestRegistrationEndDate: "2025-04-05T17:35:00.000Z",
		contestRegistrationStartDate: "2025-04-05T14:35:00.000Z",
		contestSlug: "Teza Round 1 (Codeforces Round 1015, Div. 1 + Div. 2)",
		contestStartDate: "2025-04-05T14:35:00.000Z",
		contestType: "CF",
		contestUrl: "https://codeforces.com/contest/2084",
		platform: "codeforces",
	},
	{
		_id: "67e2385175f6e73b03b04af6",
		contestCode: "abc400",
		contestDuration: 6000,
		contestEndDate: "2025-04-05T13:40:00.000Z",
		contestName: "AtCoder Beginner Contest 400",
		contestRegistrationEndDate: "2025-04-05T13:40:00.000Z",
		contestRegistrationStartDate: "2025-04-05T12:00:00.000Z",
		contestSlug: "abc400",
		contestStartDate: "2025-04-05T12:00:00.000Z",
		contestType: "Other",
		contestUrl: "https://atcoder.jp/contests/abc400",
		platform: "atcoder",
	},
	{
		_id: "67da4f5075f6e73b03705f1e",
		contestCode: "2086",
		contestDuration: 7200,
		contestEndDate: "2025-04-03T16:35:00.000Z",
		contestName: "Educational Codeforces Round 177 (Rated for Div. 2)",
		contestRegistrationEndDate: "2025-04-03T16:35:00.000Z",
		contestRegistrationStartDate: "2025-04-03T14:35:00.000Z",
		contestSlug: "Educational Codeforces Round 177 (Rated for Div. 2)",
		contestStartDate: "2025-04-03T14:35:00.000Z",
		contestType: "ICPC",
		contestUrl: "https://codeforces.com/contest/2086",
		platform: "codeforces",
	},
	{
		_id: "67dcf25075f6e73b03857e82",
		contestCode: "START180",
		contestDuration: 7200,
		contestEndDate: "2025-04-02T16:30:00.000Z",
		contestName: "Starters 180",
		contestRegistrationEndDate: "2025-04-02T16:30:00.000Z",
		contestRegistrationStartDate: "2025-04-02T14:30:00.000Z",
		contestSlug: "START180",
		contestStartDate: "2025-04-02T14:30:00.000Z",
		contestType: "Starters",
		contestUrl: "https://www.codechef.com/START180",
		platform: "codechef",
	},
	{
		_id: "67e77e5075f6e73b03d37a0e",
		contestCode: "2095",
		contestDuration: 7200,
		contestEndDate: "2025-04-01T16:35:00.000Z",
		contestName: "April Fools Day Contest 2025",
		contestRegistrationEndDate: "2025-04-01T16:35:00.000Z",
		contestRegistrationStartDate: "2025-04-01T14:35:00.000Z",
		contestSlug: "April Fools Day Contest 2025",
		contestStartDate: "2025-04-01T14:35:00.000Z",
		contestType: "ICPC",
		contestUrl: "https://codeforces.com/contest/2095",
		platform: "codeforces",
	},
];

function groupby(contests, fn) {
	const res = {};
	for (let obj of contests) {
		const key = fn(obj);
		if (key in res) {
			res[key].push(obj);
		} else {
			res[key] = [obj];
		}
	}
	return res;
}

export default function List() {
	// console.log(
	// 	contests
	// 		.filter((a) => ["leetcode", "codeforces"].includes(a.platform))
	// 		.sort((a, b) => compareAsc(a.contestStartDate, b.contestStartDate)),
	// );
	const contestsForList = groupby(
		contests.filter((a) => ["leetcode", "codeforces"].includes(a.platform)),
		(a) => format(a.contestStartDate, "yyyy-MM-dd"),
	);
	return (
		<ul className="flex flex-col gap-8">
			{Object.entries(contestsForList)
				.sort(([a], [b]) => compareAsc(a, b))
				.map(([key, value]) => (
					<span key={key + key} className="flex flex-col gap-2">
						<li key={key} className="text-neutral-600">
							{format(key, "dd MM yyyy")}
						</li>
						{value.map((cont) => (
							<li
								key={cont._id}
								className="w-full py-4 px-5 bg-neutral-900 rounded flex items-center gap-4"
							>
								{cont.platform === "leetcode" ? (
									<Leetcode />
								) : cont.platform === "codeforces" ? (
									<CodeForces />
								) : null}
								<div className="flex flex-col items-start gap-2">
									<a
										href={cont.contestUrl}
										className="underline underline-offset-2"
									>
										{cont.contestName}
									</a>
									<div className="flex items-center gap-4 *:text-neutral-500 *:text-sm">
										<span>
											{format(
												cont.contestStartDate,
												"h b",
											) +
												" - " +
												format(
													cont.contestEndDate,
													"h b",
												)}
										</span>
										<span>
											{cont.contestDuration / 60} mins
										</span>
									</div>
								</div>
							</li>
						))}
					</span>
				))}
		</ul>
	);
}
