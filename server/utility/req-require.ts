import { RoleType } from './../models/Role';
/**
  *  Defines required fields that a controller method's req argument must contain. Returns false if a parameter is missing.
  *  Usage: reqRequire(req, res,
  *    ['jwt', 401, "Missing jwt",
  *      ['id', 400, "Jwt missing id"]],
  *    ['body', 400, "Missing body",
  *      ['username', 400, "Missing username param"],
  *      ['password', 400, "Missing password param"]
  *    ]
  *   );
  */
export function reqRequire(req, res, ...requirements): boolean {
  for(let i = 0; i < requirements.length; i++) {
    let reqArray = requirements[i];
    let reqMet = evalReqArray(req, reqArray, res);
    if (!reqMet) {
      return false;
    }
  }
  return true;
}

function evalReqArray(reqObject, reqArray: any[], res): boolean {
  let field = reqArray[0];
  let status = reqArray[1];
  let msg = reqArray[2];

  if(typeof field !== 'string' || typeof status !== 'number' || typeof msg !== 'string') {
    throw new Error("Malformed requirement array. Check your reqRequire call syntax");
  }

  if (reqObject[field] === undefined) {
    res.status(status);
    res.json({
      message: msg
    });
    return false;
  }

  for (let i = 3; i < reqArray.length; i++) {
    let subReqObject = reqObject[field];
    let subReqArray = reqArray[i];
    let reqMet = evalReqArray(subReqObject, subReqArray, res);
    if (!reqMet) { return false; }
  }
  return true;
};

export function requireRole(req, res, allowedRoles: RoleType[]) {
  if (allowedRoles.length === 0) { return true; }
  if (!req.jwt || ! req.jwt.role) {
    throw new Error("Missing or invailid auth token");
  }
  let userRole = req.jwt.role;
  let hasRole = false;
  for (let i = 0; i < allowedRoles.length; i++) {
    if (userRole === allowedRoles[i]) {
      hasRole = true;
      break;
    }
  }
  if(!hasRole) {
    res.status(401);
    res.json({
      message: "Unauthorized"
    });
  }
  return hasRole;
}
