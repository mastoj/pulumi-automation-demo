// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResourceGroupSpecification, ResourceSummary } from "../../../modules/resource-groups/types";

const saveResourceGroup = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const specification = req.body as ResourceGroupSpecification;
    console.log("==> Specification: ", specification);
    res.status(200).json(specification);
}

interface Handler {
    POST: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
    GET: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}
const createHandler = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        await handler.POST(req, res);
    }
    else if(req.method === "GET") {
        await handler.GET(req, res);
    }
}

const getResourceGroups = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const result = Array.from({length: 10}, (_, i) => ({
        stackName: `stack-${i}`,
        resourceCount: i^2
    }));

    console.log("==> result: ", result);
    res.status(200).json(result);
}

export default createHandler({ POST: saveResourceGroup, GET: getResourceGroups });