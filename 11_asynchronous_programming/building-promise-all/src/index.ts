export function Promise_all(promises: Promise<any>[]): Promise<any> {
    return new Promise((resolve, reject) => {
        let count = promises.length;
        if (count === 0) resolve([]);
        const res: any[] = [];
        for (let i = 0; i < promises.length; i++) {
            promises[i].then((val: any) => {
                res[i] = val;
                count--;
                if (count === 0) resolve(res);
                return val;
            }).catch((err: any) => {
                reject(err);
            });
        }
    });
}