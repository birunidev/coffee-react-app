import { Gap, ImagePicker, InputField, Select } from "components";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import React from "react";

export default function Create() {
  const buttonHandler = () => {};
  return (
    <DashboardLayout activePage="Menu">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Save new menu"
        hasButton={true}
      />
      <div className="lg:flex mt-4 p-[30px] rounded-xl bg-white min-h-[100vh]">
        <div className="w-full lg:mr-4  xl:mr-10">
          <InputField label="Title" />
          <Gap height={20} />
          <InputField label="Price" />
          <Gap height={20} />
          <InputField label="Sale Price" />
          <Gap height={20} />
          <InputField label="Description" />
        </div>
        <div className="lg:w-1/3">
          <Select
            label="Categories"
            options={[
              {
                title: "☕ Coffee",
                value: "coffee",
              },
            ]}
          />
          <Gap height={20} />
          <ImagePicker label="Thumbnail" />
        </div>
      </div>
    </DashboardLayout>
  );
}
