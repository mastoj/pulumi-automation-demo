// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createApplication } from "../../modules/common/api/application";


const createHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        const application = createApplication();
        if (req.method === "POST") {
            const { slug } = req.query;
            const [route] = slug as string[];
            await application.createResource(route, req.body);
            res.status(200).json(req.body);
        }
        else if(req.method === "GET") {
            const { slug } = req.query;
            const [route] = slug as string[];
            console.log("==> GET: ", route);
            const resources = await application.getResources(route);
            res.status(200).json(resources);
        }
        else if(req.method === "DELETE") {
            const { slug } = req.query;
            const [route, stack] = slug as string[];
            console.log("==> DELETE: ", route, stack);
            await application.deleteResource(route, stack);
            res.status(200).json(`${route}/${stack} deleted`);
        }
    };

export default createHandler;
