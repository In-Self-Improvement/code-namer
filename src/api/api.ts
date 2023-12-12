import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseAPI from '~/firebase/firebase';

export const getData = async (db: string) => {
  try {
    const response = await firebaseAPI.get(db);
    return response.data.documents; // 이 부분에서 필요한 데이터를 반환합니다.
  } catch (error) {
    if (error.response) {
      // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
    } else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못함
    } else {
      // 오류를 발생시킨 요청을 설정하는 중 문제가 발생함
    }
    throw error; // 오류를 다시 던져서 함수 호출자가 처리할 수 있도록 합니다.
  }
};

export const postData = async (db: string, data: any) => {
  firebaseAPI
    .post(db, data)
    .then((response) => {})
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못함
      } else {
        // 오류를 발생시킨 요청을 설정하는 중 문제가 발생함
      }
    });
};

export const postUserData = async (data: any) => {
  const userId = 'test3@naver.com';
  // const userUId =
  const db = `/users/?documentId=${userId}`;
  firebaseAPI
    .post(db, data)
    .then((response) => {})
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못함
      } else {
        // 오류를 발생시킨 요청을 설정하는 중 문제가 발생함
      }
    });
};

export const updateData = async (db: string, data: any) => {
  firebaseAPI
    .patch(`${db}/VAbx9EUVY6HNSVrsbc7f?updateMask.fieldPaths=likes`, data)
    .then((response) => {})
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못함
      } else {
        // 오류를 발생시킨 요청을 설정하는 중 문제가 발생함
      }
    });
  // .catch((error) => {
  //   console.error("Error adding document:", error);
  // });
};

export const getDataByIndex = (db: string, index?: number) => {
  firebaseAPI
    .get(`${db}/indexes/VAbx9EUVY6HNSVrsbc7f`)
    .then((response) => {})
    .catch((error) => {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못함
      } else {
        // 오류를 발생시킨 요청을 설정하는 중 문제가 발생함
      }
    });
  // .catch((error) => {
  //   console.error("Error adding document:", error);
  // });
};
