import {
  Form,
  TextInput,
  Toggle,
  Button,
  Column,
  Stack,
} from "@carbon/react";
import { useState } from "react";
import { MenuItem } from "../interfaces/Interface";
import { TrashCan } from "@carbon/icons-react";

const CreateMenu = () => {
  const [menuItem, setMenuItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    hasChildren: false,
    children: [],
    parentId: undefined,
    url: "",
    isActive: true,
    isDeleted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggle = (field: keyof MenuItem) => (value: boolean) => {
    setMenuItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleChildChange = (
    index: number,
    field: keyof MenuItem,
    value: string | boolean
  ) => {
    setMenuItem((prev) => {
      const updatedChildren = prev.children ? [...prev.children] : [];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
        hasChildren: false,
        isDeleted: false,
        isActive: updatedChildren[index]?.isActive ?? true,
      };
      return { ...prev, children: updatedChildren };
    });
  };

  const addChild = () => {
    setMenuItem((prev) => ({
      ...prev,
      children: [
        ...(prev.children || []),
        {
          name: "",
          description: "",
          url: "",
          hasChildren: false,
          isActive: true,
          isDeleted: false,
        },
      ],
    }));
  };

  const removeChild = (index: number) => {
    setMenuItem((prev) => {
      const updatedChildren = [...(prev.children || [])];
      updatedChildren.splice(index, 1);
      return { ...prev, children: updatedChildren };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuItem),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to save menu:", error);
      } else {
        const result = await response.json();
        console.log("Menu saved:", result);
      }
      setMenuItem({
        name: "",
    description: "",
    hasChildren: false,
    children: [],
    parentId: undefined,
    url: "",
    isActive: true,
    isDeleted: false,
      })
    } catch (err) {
      console.error("Network or server error:", err);
    }
  };

  return (
    <>
    <h2>Create Menu Item</h2>
    <hr />
    <Column sm={4} md={6} lg={6}>
        <Form onSubmit={handleSubmit}>
          <TextInput
            id="name"
            labelText="Menu Name"
            placeholder="Enter menu name"
            value={menuItem.name}
            onChange={handleChange}
            required
          />
          <TextInput
            id="description"
            labelText="Description"
            placeholder="Enter description"
            value={menuItem.description}
            onChange={handleChange}
          />
          <TextInput
            id="url"
            labelText="URL"
            placeholder="Enter menu URL"
            value={menuItem.url}
            onChange={handleChange}
          />
          <TextInput
            id="parentId"
            labelText="Parent ID (optional)"
            placeholder="Enter parent menu ID"
            value={menuItem.parentId}
            onChange={handleChange}
          />

          <Toggle
            id="hasChildren"
            labelText="Has Children"
            labelA="No"
            labelB="Yes"
            toggled={menuItem.hasChildren}
            onToggle={handleToggle("hasChildren")}
          />

          <Toggle
            id="isActive"
            labelText="Is Active"
            labelA="Inactive"
            labelB="Active"
            toggled={menuItem.isActive}
            onToggle={handleToggle("isActive")}
          />

          <Toggle
            id="isDeleted"
            labelText="Is Deleted"
            labelA="No"
            labelB="Yes"
            toggled={menuItem.isDeleted}
            onToggle={handleToggle("isDeleted")}
          />

          {menuItem.hasChildren && (
            <div style={{ marginTop: "1rem" }}>
              <h4>Child Menu Items</h4>
              {(menuItem.children || []).map((child, index) => (
                <Stack key={index} gap={3}>
                  <TextInput
                    id={`child-name-${index}`}
                    labelText={`Child #${index + 1} Name`}
                    placeholder="Enter child name"
                    value={child.name}
                    onChange={(e) =>
                      handleChildChange(index, "name", e.target.value)
                    }
                  />
                  <TextInput
                    id={`child-url-${index}`}
                    labelText="URL"
                    placeholder="Enter child URL"
                    value={child.url || ""}
                    onChange={(e) =>
                      handleChildChange(index, "url", e.target.value)
                    }
                  />
                  <Toggle
                    id={`child-isActive-${index}`}
                    labelText="Active"
                    labelA="No"
                    labelB="Yes"
                    toggled={child.isActive}
                    onToggle={(val) =>
                      handleChildChange(index, "isActive", val)
                    }
                  />
                  <Button
                    kind="danger--ghost"
                    size="sm"
                    onClick={() => removeChild(index)}
                    renderIcon={TrashCan}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}
              <Button
                kind="tertiary"
                style={{ marginTop: "1rem" }}
                onClick={addChild}
              >
                + Add Child
              </Button>
            </div>
          )}

          <Button type="submit" style={{ marginTop: "2rem" }}>
            Create Menu
          </Button>
        </Form>
    </Column>
    </>
  );
};

export default CreateMenu;
