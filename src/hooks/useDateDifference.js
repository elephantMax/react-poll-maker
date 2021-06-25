import getDateDifference from '../plugins/getDateDifference';
import getDate from '../plugins/getDate';
import { useMemo } from 'react';

const useDateDifference = (poll) => {
    const dateDifference = useMemo(() => {
        if (poll) {
            const date = getDate(poll.id)
            return getDateDifference(date)
        }
        return null
    }, [poll])

    return dateDifference
}

export default useDateDifference;