import { findAccountLogs } from "@/api/caravan/Login";
import { LoginFrequencyChart } from "@/components/Echarts";
import { Table } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const LoginLog = () => {
  const columns: any = [
    {
      title: "账号",
      dataIndex: "name",
    },
    {
      title: "浏览器版本",
      dataIndex: "bowser",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "来源",
      dataIndex: "host",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "登录设备",
      dataIndex: "os",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "国家",
      dataIndex: "country",
    },
    {
      title: "省份",
      dataIndex: "province",
    },
    {
      title: "市区",
      dataIndex: "city",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "登陆时间",
      dataIndex: "created",
      render: (item) => {
        return <span>{dayjs(item).format("YYYY-MM-DD HH:mm")}</span>;
      },
    },
  ];

  const [dataSource, setDataSource] = useState<any[]>();

  const getLog = () => {
    findAccountLogs({
      st: dayjs().subtract(15, "days").format("YYYY-MM-DD"),
      et: dayjs().add(1, "days").format("YYYY-MM-DD"),
    })
      .then((r) => {
        if (r.data.code === 200) setDataSource(r?.data?.data?.reverse() || []);
      })
      .catch(() => setDataSource([]));
  };
  useEffect(getLog, []);

  return (
    <div>
      <div
        style={{
          padding: "10px 10px 0 10px",
          background: "#fff",
        }}
      >
        <Table rowKey="id" columns={columns} dataSource={dataSource} />
      </div>
      <div
        style={{
          padding: 10,
          background: "#fff",
          marginTop: 12,
        }}
      >
        <LoginFrequencyChart dataSource={dataSource} />
      </div>
    </div>
  );
};

export default LoginLog;