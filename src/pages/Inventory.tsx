import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { type } from "os";


interface InventoryProps {
    id: number;
    title: string;
    // description: string;
    price: number;
    thumbnail: string;
    rating: number;
    stock: number;
    brand : string;
    category : string;

}

interface ApiResponse {
    products: InventoryProps[];
}

const Inventory = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [dataSource, setDataSource] = useState<InventoryProps[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((json: ApiResponse) => {
                // console.log(json);
                setDataSource(json.products);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col justify-center ">
        < h1 className="text-xl mt-8 font-bold">Inventory</h1>
        <Table
            loading={loading}
            columns={[
                {
                    title: "Photo",
                    dataIndex: "thumbnail",
                    render: (link: string) => {
                        return <Avatar src={link} />;
                    },
                },
                {
                    title: "Title",
                    dataIndex: "title",
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    render: (value) => <span>{value} Ksh</span>,
                }, 
                {
                    title: "Rating",
                    dataIndex: "rating",
                    render: (rating: number) => {
                        return <Rate disabled defaultValue={rating} />;
                    },
                },
                {
                    title: "Stock",
                    dataIndex: "stock",
                },
                {
                    title: "Brand",
                    dataIndex: "brand",
                },
                {
                    title: "Category",
                    dataIndex: "category",
                },
            ]}
            dataSource={dataSource}
            rowKey="id"
            pagination={{
                pageSize: 8,
              }}
        />
    </div>

    );
};

export default Inventory;