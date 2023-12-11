$(function () {
    if (location.host == "www.nicovideo.jp") {
        console.log("ニコ動")
        //chrome.storage APIを呼び出し、取得した現在のモードを'select_mode'に格納
        chrome.storage.local.get(["comment_invisible_mode"], function (pattern) {
            var select_mode = pattern.comment_invisible_mode;

            $('.ControllerContainer-area').eq(2).addClass('ControllerContainer-area-right');

            //動画の裏にある背景を#252525に変更
            $('.VideoContainer').css('background-color', '#252525');
            $('.PlayerContainer').css('background-color', '#252525');

            //コメント欄の幅を指定しているクラス
            $('.MainContainer-player').addClass('MainContainer-player-backup');
            //画面を回転させるボタン
            $('.CommentOnOffButton').before('<button id="movie_rotate_ex" class="ActionButton ControllerButton " data-title="動画を回転させる(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M478 1056q-93 0-176-33.5t-147-92Q91 872 50 793.5T0 624h72q9 72 41 135.5T195.5 871Q246 919 311 948.5T449 983l-67-68 50-51 175 174q-38 11-71 14.5t-58 3.5Zm122-192v-96H360q-30 0-51-21t-21-51V456h-96v-72h96v-96h72v408h408v72h-96v96h-72Zm0-240V456H432v-72h168q30 0 51 21t21 51v168h-72Zm288-96q-9-72-41-135.5T764.5 281q-50.5-48-115-77.5T511 169l67 68-50 51-175-174q38-11 71-14.5t58-3.5q93 0 176 33.5t147 92q64 58.5 105 137T960 528h-72Z"/></svg></div><buton>');

            //コメ欄表示
            if ("future_disable" == select_mode) {
                //コメント欄非表示
                $('.MainContainer-playerPanel').css('display', 'none');
                //動画中央寄せ
                $('.VideoContainer').css('margin', '0 auto');
                //動画サイズ拡大
                $('.VideoContainer').css('padding-top', '42.1875%');
                $('.VideoContainer').css('width', '100%');
                //コメ欄オンボタンをコメントオンオフボタンの左に追加
                $('.CommentOnOffButton').before('<button id="comments-enable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示する(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.833 11.708q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Zm11.563 3.084-1.479-1.459h.666V3.417H6l-1.75-1.75h12.417q.687 0 1.177.489.489.49.489 1.177v10q0 .542-.281.917t-.656.542ZM9.354 6.75 8.333 5.729V5H15v1.75Zm2.417 2.417-1.75-1.75H15v1.75Zm5.312 10.25L12.625 15H5l-3.333 3.333V4L.583 2.917l1.229-1.229 16.5 16.5ZM3.417 5.75v8.354l.854-.854h6.646Zm7.541 2.625ZM7.167 9.5Zm-1.334-.292q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Z"/></svg></div><buton>');
                //'MainContainer-player'を削除し、コメント欄の幅を解除
                $('.MainContainer-player-backup').removeClass('MainContainer-player');

                //コメ欄表示(初期設定)
            } else {
                //コメ欄オフボタンをコメントオンオフオボタンの左に追加
                $('.CommentOnOffButton').before('<button id="comments-disable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示しない(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8.333 6.729H15v-1.75H8.333Zm0 2.479H15v-1.75H8.333Zm0 2.48h4.188v-1.75H8.333ZM5.875 6.729q.354 0 .615-.26.26-.261.26-.615t-.26-.614q-.261-.261-.615-.261t-.615.261Q5 5.5 5 5.854t.26.615q.261.26.615.26Zm0 2.479q.354 0 .615-.26.26-.26.26-.615 0-.354-.26-.614-.261-.261-.615-.261t-.615.261q-.26.26-.26.614 0 .355.26.615.261.26.615.26Zm0 2.48q.354 0 .615-.261.26-.26.26-.615 0-.354-.26-.614-.261-.26-.615-.26t-.615.26q-.26.26-.26.614 0 .355.26.615.261.261.615.261Zm-4.208 6.645V3.417q0-.729.51-1.24.511-.51 1.24-.51h13.166q.729 0 1.24.51.51.511.51 1.24v9.833q0 .729-.51 1.24-.511.51-1.24.51H5Zm1.75-4.229.854-.854h12.312V3.417H3.417Zm0-10.687v10.687Z"/></svg></div><buton>');
            };
        });

        //コメ欄非表示
        $(document).on("click", "#comments-disable-ex", function () {
            //'MainContainer-player'を削除し、コメント欄の幅を解除
            $('.MainContainer-player-backup').removeClass('MainContainer-player');
            //コメ欄非表示ボタンを削除
            $('#comments-disable-ex').remove();
            //コメント欄非表示
            $('.MainContainer-playerPanel').css('display', 'none');
            //上記によりプレイヤーが引き伸ばされるため、動画を中央に寄せる
            $('.VideoContainer').css('margin', '0 auto');
            //動画サイズ拡大
            $('.VideoContainer').css('padding-top', '42.1875%');
            $('.VideoContainer').css('width', '100%');
            //コメ欄表示ボタンを設置
            $('.CommentOnOffButton').before('<button id="comments-enable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示する(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.833 11.708q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Zm11.563 3.084-1.479-1.459h.666V3.417H6l-1.75-1.75h12.417q.687 0 1.177.489.489.49.489 1.177v10q0 .542-.281.917t-.656.542ZM9.354 6.75 8.333 5.729V5H15v1.75Zm2.417 2.417-1.75-1.75H15v1.75Zm5.312 10.25L12.625 15H5l-3.333 3.333V4L.583 2.917l1.229-1.229 16.5 16.5ZM3.417 5.75v8.354l.854-.854h6.646Zm7.541 2.625ZM7.167 9.5Zm-1.334-.292q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Z"/></svg></div><buton>');
        });

        //コメ欄表示
        $(document).on("click", "#comments-enable-ex", function () {
            //'MainContainer-player'を追加し、コメント欄の幅を追加
            $('.MainContainer-player-backup').addClass('MainContainer-player');
            //コメ欄表示ボタンを削除
            $('#comments-enable-ex').remove();
            //コメ欄表示
            $('.MainContainer-playerPanel').css('display', 'block');
            //動画中央寄せを解除
            $('.VideoContainer').css('margin', '');
            //コメ欄非表示ボタンを設置
            $('.CommentOnOffButton').before('<button id="comments-disable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示しない(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8.333 6.729H15v-1.75H8.333Zm0 2.479H15v-1.75H8.333Zm0 2.48h4.188v-1.75H8.333ZM5.875 6.729q.354 0 .615-.26.26-.261.26-.615t-.26-.614q-.261-.261-.615-.261t-.615.261Q5 5.5 5 5.854t.26.615q.261.26.615.26Zm0 2.479q.354 0 .615-.26.26-.26.26-.615 0-.354-.26-.614-.261-.261-.615-.261t-.615.261q-.26.26-.26.614 0 .355.26.615.261.26.615.26Zm0 2.48q.354 0 .615-.261.26-.26.26-.615 0-.354-.26-.614-.261-.26-.615-.26t-.615.26q-.26.26-.26.614 0 .355.26.615.261.261.615.261Zm-4.208 6.645V3.417q0-.729.51-1.24.511-.51 1.24-.51h13.166q.729 0 1.24.51.51.511.51 1.24v9.833q0 .729-.51 1.24-.511.51-1.24.51H5Zm1.75-4.229.854-.854h12.312V3.417H3.417Zm0-10.687v10.687Z"/></svg></div><buton>');

            if ($('div').hasClass('MainContainer-player')) {

            }
        });

        //全画面表示ボタンを押されたときの処理
        $(document).on("click", ".EnableFullScreenButton", function () {

            //コメ欄非表示時
            if ($('#comments-enable-ex').length) {
                //コメ欄分の幅を元に戻す
                $('.MainContainer-player-backup').addClass('MainContainer-player');
                //コメ欄非表示で全画面になったことを表すクラスを追加
                $('.MainContainer-player-backup').addClass('MainContainer-player-enable-full');

                //コメ欄表示ボタンを削除
                $('#comments-disable-ex').remove();
                $('#comments-enable-ex').remove();
                //動画中央寄せを解除
                $('.VideoContainer').css('margin', '');

                //全画面解除ボタンを押されたときの処理
                $(document).on("click", ".DisableFullScreenButton", function () {

                    //コメ欄分の幅を削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player');
                    //コメ欄非表示で全画面になったことを表すクラスを削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player-enable-full');
                    //コメ欄を非表示
                    $('.MainContainer-playerPanel').css('display', 'none');
                    //動画を中央寄せ
                    $('.VideoContainer').css('margin', '0 auto');
                    //動画サイズ拡大
                    $('.VideoContainer').css('padding-top', '42.1875%');
                    $('.VideoContainer').css('width', '100%');
                    //コメ欄非表示ボタンを削除
                    $('#comments-disable-ex').remove();
                    $('#comments-enable-ex').remove();
                    //コメ欄表示ボタンを追加
                    $('.CommentOnOffButton').before('<button id="comments-enable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示する(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.833 11.708q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Zm11.563 3.084-1.479-1.459h.666V3.417H6l-1.75-1.75h12.417q.687 0 1.177.489.489.49.489 1.177v10q0 .542-.281.917t-.656.542ZM9.354 6.75 8.333 5.729V5H15v1.75Zm2.417 2.417-1.75-1.75H15v1.75Zm5.312 10.25L12.625 15H5l-3.333 3.333V4L.583 2.917l1.229-1.229 16.5 16.5ZM3.417 5.75v8.354l.854-.854h6.646Zm7.541 2.625ZM7.167 9.5Zm-1.334-.292q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Z"/></svg></div><buton>');
                })

                //コメ欄表示時
            } else if ($('#comments-disable-ex').length) {
                //コメ欄非表示ボタンを削除
                $('#comments-disable-ex').remove();
                $('#comments-enable-ex').remove();
                //コメ欄表示で全画面になったことを表すクラスを追加
                $('.MainContainer-player-backup').addClass('MainContainer-player-disable-full');

                //全画面解除ボタンを押されたときの処理
                $(document).on("click", ".DisableFullScreenButton", function () {
                    //コメ欄非表示ボタンを削除
                    $('#comments-disable-ex').remove();
                    $('#comments-enable-ex').remove();
                    //コメ欄表示で全画面になったことを表すクラスを削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player-disable-full');

                    //コメ欄分の幅を元に戻す
                    $('.MainContainer-player-backup').addClass('MainContainer-player');
                    //コメ欄を表示
                    $('.MainContainer-playerPanel').css('display', 'block');
                    //コメ欄非表示ボタンを追加
                    $('.CommentOnOffButton').before('<button id="comments-disable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示しない(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8.333 6.729H15v-1.75H8.333Zm0 2.479H15v-1.75H8.333Zm0 2.48h4.188v-1.75H8.333ZM5.875 6.729q.354 0 .615-.26.26-.261.26-.615t-.26-.614q-.261-.261-.615-.261t-.615.261Q5 5.5 5 5.854t.26.615q.261.26.615.26Zm0 2.479q.354 0 .615-.26.26-.26.26-.615 0-.354-.26-.614-.261-.261-.615-.261t-.615.261q-.26.26-.26.614 0 .355.26.615.261.26.615.26Zm0 2.48q.354 0 .615-.261.26-.26.26-.615 0-.354-.26-.614-.261-.26-.615-.26t-.615.26q-.26.26-.26.614 0 .355.26.615.261.261.615.261Zm-4.208 6.645V3.417q0-.729.51-1.24.511-.51 1.24-.51h13.166q.729 0 1.24.51.51.511.51 1.24v9.833q0 .729-.51 1.24-.511.51-1.24.51H5Zm1.75-4.229.854-.854h12.312V3.417H3.417Zm0-10.687v10.687Z"/></svg></div><buton>');
                })
            }
        })

        //ESCAPEキーで全画面終了したときの処理
        document.addEventListener('keydown', comments_enable_ex_FD, false);
        function comments_enable_ex_FD(event) {
            if (event.code === "Escape") {

                //コメ欄表示時
                if ($('.MainContainer-player-disable-full').length) {
                    //コメ欄分の幅を元に戻す
                    $('.MainContainer-player-backup').addClass('MainContainer-player');
                    //コメ欄非表示ボタンを削除
                    $('#comments-disable-ex').remove();
                    $('#comments-enable-ex').remove();
                    //コメ欄非表示ボタンを追加
                    $('.CommentOnOffButton').before('<button id="comments-disable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示しない(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8.333 6.729H15v-1.75H8.333Zm0 2.479H15v-1.75H8.333Zm0 2.48h4.188v-1.75H8.333ZM5.875 6.729q.354 0 .615-.26.26-.261.26-.615t-.26-.614q-.261-.261-.615-.261t-.615.261Q5 5.5 5 5.854t.26.615q.261.26.615.26Zm0 2.479q.354 0 .615-.26.26-.26.26-.615 0-.354-.26-.614-.261-.261-.615-.261t-.615.261q-.26.26-.26.614 0 .355.26.615.261.26.615.26Zm0 2.48q.354 0 .615-.261.26-.26.26-.615 0-.354-.26-.614-.261-.26-.615-.26t-.615.26q-.26.26-.26.614 0 .355.26.615.261.261.615.261Zm-4.208 6.645V3.417q0-.729.51-1.24.511-.51 1.24-.51h13.166q.729 0 1.24.51.51.511.51 1.24v9.833q0 .729-.51 1.24-.511.51-1.24.51H5Zm1.75-4.229.854-.854h12.312V3.417H3.417Zm0-10.687v10.687Z"/></svg></div><buton>');

                    //コメ欄非表示時
                } else if ($('.MainContainer-player-enable-full').length) {
                    //コメ欄分の幅を削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player');
                    //コメ欄表示で全画面になったことを表すクラスを削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player-enable-full');
                    //コメント欄非表示
                    $('.MainContainer-playerPanel').css('display', 'none');
                    //動画中央寄せ
                    $('.VideoContainer').css('margin', '0 auto');
                    //動画サイズ拡大
                    $('.VideoContainer').css('padding-top', '42.1875%');
                    $('.VideoContainer').css('width', '100%');
                    //コメ欄非表示ボタンを削除
                    $('#comments-disable-ex').remove();
                    $('#comments-enable-ex').remove();
                    //コメ欄表示ボタンを追加
                    $('.CommentOnOffButton').before('<button id="comments-enable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示する(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.833 11.708q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Zm11.563 3.084-1.479-1.459h.666V3.417H6l-1.75-1.75h12.417q.687 0 1.177.489.489.49.489 1.177v10q0 .542-.281.917t-.656.542ZM9.354 6.75 8.333 5.729V5H15v1.75Zm2.417 2.417-1.75-1.75H15v1.75Zm5.312 10.25L12.625 15H5l-3.333 3.333V4L.583 2.917l1.229-1.229 16.5 16.5ZM3.417 5.75v8.354l.854-.854h6.646Zm7.541 2.625ZM7.167 9.5Zm-1.334-.292q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Z"/></svg></div><buton>');
                }
            }
        };

        //Fキーで全画面終了したときの処理
        document.addEventListener('keydown', comments_enable_ex_FD, false);
        function comments_enable_ex_FD(event) {
            if (event.key === 'f' || event.key === 'F') {

                //コメ欄表示時
                if ($('.MainContainer-player-disable-full').length) {
                    //コメ欄分の幅を元に戻す
                    $('.MainContainer-player-backup').addClass('MainContainer-player');
                    //コメ欄非表示ボタンを削除
                    $('#comments-disable-ex').remove();
                    $('#comments-enable-ex').remove();
                    //コメ欄非表示ボタンを追加
                    $('.CommentOnOffButton').before('<button id="comments-disable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示しない(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M8.333 6.729H15v-1.75H8.333Zm0 2.479H15v-1.75H8.333Zm0 2.48h4.188v-1.75H8.333ZM5.875 6.729q.354 0 .615-.26.26-.261.26-.615t-.26-.614q-.261-.261-.615-.261t-.615.261Q5 5.5 5 5.854t.26.615q.261.26.615.26Zm0 2.479q.354 0 .615-.26.26-.26.26-.615 0-.354-.26-.614-.261-.261-.615-.261t-.615.261q-.26.26-.26.614 0 .355.26.615.261.26.615.26Zm0 2.48q.354 0 .615-.261.26-.26.26-.615 0-.354-.26-.614-.261-.26-.615-.26t-.615.26q-.26.26-.26.614 0 .355.26.615.261.261.615.261Zm-4.208 6.645V3.417q0-.729.51-1.24.511-.51 1.24-.51h13.166q.729 0 1.24.51.51.511.51 1.24v9.833q0 .729-.51 1.24-.511.51-1.24.51H5Zm1.75-4.229.854-.854h12.312V3.417H3.417Zm0-10.687v10.687Z"/></svg></div><buton>');

                    //コメ欄非表示時
                } else if ($('.MainContainer-player-enable-full').length) {
                    //コメ欄分の幅を削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player');
                    //コメ欄表示で全画面になったことを表すクラスを削除
                    $('.MainContainer-player-backup').removeClass('MainContainer-player-enable-full');
                    //コメント欄非表示
                    $('.MainContainer-playerPanel').css('display', 'none');
                    //動画中央寄せ
                    $('.VideoContainer').css('margin', '0 auto');
                    //動画サイズ拡大
                    $('.VideoContainer').css('padding-top', '42.1875%');
                    $('.VideoContainer').css('width', '100%');
                    //コメ欄非表示ボタンを削除
                    $('#comments-disable-ex').remove();
                    $('#comments-enable-ex').remove();
                    //コメ欄表示ボタンを追加
                    $('.CommentOnOffButton').before('<button id="comments-enable-ex" class="ActionButton ControllerButton comments-ex-class" data-title="コメント欄を表示する(拡張機能)"><div class="ControllerButton-inner"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.833 11.708q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Zm11.563 3.084-1.479-1.459h.666V3.417H6l-1.75-1.75h12.417q.687 0 1.177.489.489.49.489 1.177v10q0 .542-.281.917t-.656.542ZM9.354 6.75 8.333 5.729V5H15v1.75Zm2.417 2.417-1.75-1.75H15v1.75Zm5.312 10.25L12.625 15H5l-3.333 3.333V4L.583 2.917l1.229-1.229 16.5 16.5ZM3.417 5.75v8.354l.854-.854h6.646Zm7.541 2.625ZM7.167 9.5Zm-1.334-.292q-.354 0-.614-.26-.261-.26-.261-.615 0-.354.261-.614.26-.261.614-.261.355 0 .615.261.26.26.26.614 0 .355-.26.615t-.615.26Z"/></svg></div><buton>');
                }
            }
        };


        var obj = document.getElementsByClassName("VideoPlayer");
        obj.id = "VideoPlayer";

        //画面回転クリック1回目の挙動
        $(document).on("click", "#movie_rotate_ex", function () {
            //画面を90°回転し、サイズを16:9ベースで調整
            $('.VideoPlayer').css('transform', 'rotate(90deg) scale(56.25%)');

            var obj = document.getElementById("VideoPlayer");
            obj.id = "VideoPlayer_2";
            //次の挙動のためにIDを変更
            var obj = document.getElementById("movie_rotate_ex");
            obj.id = "movie_rotate_ex_2";
        })
        //画面回転クリック2回目の挙動
        $(document).on("click", "#movie_rotate_ex_2", function () {
            //画面を180°回転
            $('.VideoPlayer').css('transform', 'rotate(180deg)');

            var obj = document.getElementById("VideoPlayer_2");
            obj.id = "VideoPlayer_3";
            //次の挙動のためにIDを変更
            var obj = document.getElementById("movie_rotate_ex_2");
            obj.id = "movie_rotate_ex_3";
        })
        //画面回転クリック3回目の挙動
        $(document).on("click", "#movie_rotate_ex_3", function () {
            //画面を270°回転し、サイズを16:9ベースで調整
            $('.VideoPlayer').css('transform', 'rotate(270deg) scale(56.25%)');

            var obj = document.getElementById("VideoPlayer_3");
            obj.id = "VideoPlayer_4";
            //次の挙動のためにIDを変更
            var obj = document.getElementById("movie_rotate_ex_3");
            obj.id = "movie_rotate_ex_4";
        })
        //画面回転クリック4回目の挙動
        $(document).on("click", "#movie_rotate_ex_4", function () {
            //画面回転を解除
            $('.VideoPlayer').css('transform', '');
            var obj = document.getElementById("VideoPlayer_4");
            obj.id = "VideoPlayer";
            //次の挙動のためにIDを変更
            var obj = document.getElementById("movie_rotate_ex_4");
            obj.id = "movie_rotate_ex";
        })

        //コメント欄を表示で保存
        $(document).on("click", "#comments-disable-ex", function () {
            //chrome.storage APIを呼び出し、モードを'comment_invisible_mode'に'future_disable'として格納
            chrome.storage.local.set(
                {
                    "comment_invisible_mode": "future_disable",

                }
            );
        });

        //コメント欄を非表示で保存
        $(document).on("click", "#comments-enable-ex", function () {
            //chrome.storage APIを呼び出し、モードを'comment_invisible_mode'に'future_enable'として格納
            chrome.storage.local.set(
                {
                    "comment_invisible_mode": "future_enable",
                }
            );
        });

        // 以下共同墓地
        chrome.storage.local.get(["mode"], function (pattern) {
            var select_mode = pattern.mode;
            chrome.storage.local.get(["count"], function (pattern) {
                var count = pattern.count;

                if ($('.ErrorMessage').length) {
                    if ("manual" == select_mode) {
                        if (count == 1) {
                            window.location.href = "https://nico.ms/sm38213757?from=0";
                        } else if (count < 1) {
                            chrome.storage.local.get(["manual_id"], function (pattern) {
                                var id = pattern.manual_id;
                                chrome.storage.local.get(["manual_url"], function (pattern) {
                                    var url = pattern.manual_url;
                                    window.location.href = "https://nico.ms/" + id + url + "?from=0";
                                })
                            });
                        }
                    } else if (count < 1) {
                        //通常モード
                        if ("normal" == select_mode) {
                            window.location.href = "https://nico.ms/sm38213757?from=0";
                        } else if ("random" == select_mode) {
                            //ランダムモード
                            f_redirect();
                            function f_redirect() {
                                var arr = [
                                    'https://nico.ms/sm19139061?from=0',
                                    'https://nico.ms/sm27404927?from=0',
                                    'https://nico.ms/sm38213757?from=0',
                                    'https://nico.ms/sm21764448?from=0',
                                    'https://nico.ms/sm21764440?from=0',
                                    'https://nico.ms/sm21764424?from=0',
                                    'https://nico.ms/sm19668914?from=0',
                                    'https://nico.ms/sm19668700?from=0',
                                    'https://nico.ms/sm19668547?from=0',
                                    'https://nico.ms/sm19557682?from=0',
                                    'https://nico.ms/sm19140178?from=0',
                                    'https://nico.ms/sm27404936?from=0',
                                    'https://nico.ms/sm27404931?from=0',
                                    'https://nico.ms/sm19139071?from=0',
                                    'https://nico.ms/sm19139067?from=0'
                                ];
                                var num = arr.length;
                                if (arr.length == 0) return false;
                                var num = Math.floor(Math.random() * arr.length);
                                location.href = arr[num];
                            }
                        } else {
                            window.location.href = "https://nico.ms/sm38213757?from=0";
                        }
                    }
                    chrome.storage.local.set(
                        {
                            "count": count + 1,
                        }
                    );
                } else {
                    chrome.storage.local.set(
                        {
                            "count": 0,
                        }
                    );
                }
            });
        })
    }
});