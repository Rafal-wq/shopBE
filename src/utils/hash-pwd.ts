import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'sdifugwgrb879q34cnoiqehfjks we f wf o f 48 mo$#GUHJP*O  (&& JH BHIUhoiuasff',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
