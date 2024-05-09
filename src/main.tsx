import Swal from "sweetalert2";

function alertNotification() {
    /**
     * 后端地址（本地）
     */
    // const BACKEND_HOST_LOCAL = "http://localhost:8101";

    /**
     * 后端地址（线上）
     */
    // const BACKEND_HOST_PROD = "http://xxx.xxx";

    function getNotificationVoUsingGet(params) {

        const url = `http://localhost:8101/api/admin/cms/notification/getNotificationVOByDomain`;
     
        // const url = `${BACKEND_HOST_PROD}/api/notification/get/vo`;

        return fetch(url + "?" + new URLSearchParams(params))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => data)
            .catch((error) => {
                // 处理错误
                console.error("Fetch request error:", error);
                throw error;
            });
    }

    const fetchNotification = function (domain) {
        // 发起请求获取通知信息的逻辑
        getNotificationVoUsingGet({ domain })
            .then((response) => {
                const data = response.data;
                const id = data.id;
                const updateTime = data.updateTime;
                if (
                    !localStorage.getItem(id + updateTime) &&
                    data.title &&
                    data.content
                ) {
                    // 使用 SweetAlert2 显示弹窗
                    Swal.fire({
                        title: data.title,
                        text: data.content,
                        icon: "info",
                        confirmButtonText: "知道了",
                    });

                    // 存储到 localStorage
                    localStorage.setItem(id + updateTime, "id");
                }
            })
            .catch((error) => {
                console.error("Fetch request error:", error);
            });
    };

    const url = new URL(location.href);
    const domain = url.hostname;
    fetchNotification(domain);
}
alertNotification();