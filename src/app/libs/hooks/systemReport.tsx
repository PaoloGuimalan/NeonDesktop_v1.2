import { useDispatch } from 'react-redux';
import { SET_SYSTEM_CMD } from '../../../redux/types/types';

const systemReport = () => {
  const dispatch = useDispatch();
  const systemcmdreport = (status: string, report: string) => {
    dispatch({
      type: SET_SYSTEM_CMD,
      payload: {
        systemcmd: {
          status,
          report
        }
      }
    });
  };

  return { systemcmdreport };
};

export default systemReport;
