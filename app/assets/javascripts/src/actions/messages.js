import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  getMessages(follower_id) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.MESSAGES}`)
      .query({
        follower_id: follower_id,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  sendMessage(followed_id, message) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        contents: message,
        followed_id: followed_id,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            followed_id: followed_id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  sendImage(file, followed_id) {
    return new Promise((resolve, reject) => {
      request
        .post(`${APIEndpoints.MESSAGES}/upload_image`)
        .set('X-CSRF-Token', CSRFToken())
        .attach('image', file, file.name)
        .field('followed_id', followed_id)
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.SEND_IMAGE,
              post_image: file.name,
              followed_id,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
  deleteFriendships(userID) {
    return new Promise((resolve, reject) => {
      request
        .delete(`${APIEndpoints.DELETE_FRIENDSHIPS + userID}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({
          followed_id: userID,
        })
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.DELETE_FRIENDSHIPS,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
}

