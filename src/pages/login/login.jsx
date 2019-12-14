import React, { Component } from "react";
import {
  bubbleSort,
  quickSort,
  noRepeat,
  noRepeat1,
  deepClone,
  maxCount,
  maxCount1,
  tetsReduc,
  time,
  testlaji,
  shuffle,
  deepObj
} from "../pdd/paixu";
import { http, catchTest, test1, timeout, order, test2 } from "../pdd/http";
import { bibao } from "../pdd/bibao";
import { settest, settest2 } from "../pdd/setTimeout.js";
import { resolveTest, thenable } from "../pdd/promiseResolve";

export class login extends Component {
  componentDidMount() {
    deepObj();
    // const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
    // bubbleSort(arr);
    // quickSort(arr);
    // console.log(arr, "test");
    // const objectArr = [{ id: 1 }, { id: 1 }, { id: 2 }];
    // const arr = [
    //   {
    //     name: 4,
    //     age: "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    //     gender: "AAAAAA.doc"
    //   },
    //   {
    //     name: 5,
    //     age: "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    //     gender: "AAAAAA.doc"
    //   },
    //   {
    //     name: 2,
    //     age: "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    //     gender: "AAAAAA.doc"
    //   },
    //   {
    //     name: 3,
    //     gender: "BBBBBB.doc",
    //     age: "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix"
    //   },
    //   {
    //     name: 7,
    //     age: "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    //     gender: "CCCCCC.doc"
    //   },
    //   {
    //     name: 1,
    //     age: "Y13xG_4wQnOWK1QwJLgg11d0pS4hewePU95UHtpMl3eE81uS74NC-6zu-Rtnw4Ix",
    //     gender: "AAAAAA.doc"
    //   }
    // ];

    // var obj = {
    //   name: [1, 2, 3],
    //   value: {
    //     a: "b"
    //   },
    //   test: "test"
    // };
    // deepClone(obj);
    // var arr = [
    //   3,
    //   5,
    //   6,
    //   5,
    //   9,
    //   8,
    //   10,
    //   5,
    //   7,
    //   7,
    //   10,
    //   7,
    //   7,
    //   7,
    //   7,
    //   10,
    //   10,
    //   10,
    //   10,
    //   10
    // ];
    shuffle();
    // bubbleSort(arr);
    // noRepeat1(arr);
    // maxCount(arr);
    // maxCount1(arr);
    // const arr = [12, 34, 23];
    // tetsReduc(arr);
    // time(10000);
    // http();
    // catchTest()
    //   .then(param => {
    //     console.log(param);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // test1();
    // console.log(timeout);
    // timeout(3000)
    //   .then(value => {
    //     console.log(value);
    //   })
    //   .catch();
    // order();
    // test2();
    // bibao();
    // test();
    // settest2();
    // resolveTest();
    // thenable();
    // test1();
  }
  render() {
    return <div>loginaaaaaaaaa!!!!!!!!!!</div>;
  }
}
export default login;
