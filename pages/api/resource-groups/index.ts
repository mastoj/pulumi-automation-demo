// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResourceSummary } from "../../../modules/resource-groups/types";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResourceSummary[]>
) {
    const result = Array.from({length: 10}, (_, i) => ({
        stackName: `stack-${i}`,
        resourceCount: i^2
    }));

    console.log("==> result: ", result);
    res.status(200).json(result);
}
