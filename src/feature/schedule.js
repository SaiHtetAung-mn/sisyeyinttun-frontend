import React from "react";
import ApiRequest from '../utils/apiRequest';

const useSchedule = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    function generateSchedule(timePerDay, tasks) {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            const url = '/generate';
            ApiRequest.post(url, { timePerDay, tasks })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
            .finally(() => setTimeout(() => setIsLoading(false), 3000));
        });
    }

    return {
        isLoading,
        generateSchedule
    }
}

export default useSchedule;