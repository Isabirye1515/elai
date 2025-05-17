import {
  Column,
  Form,
  TextInput,
  TextArea,
  Button,
  Toggle,
  Stack,
  Select,
  SelectItem,
  Grid,
} from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";
import { useState, useEffect } from "react";
import { About, socials } from "../interfaces/Interface";

const Register = () => {
  const [formData, setFormData] = useState<Omit<About, "social">>({
    name: "",
    status: true,
    contact: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    description: "",
    image: "",
  });

  const [socialLinks, setSocialLinks] = useState<socials[]>([]);
  const [aboutList, setAboutList] = useState<About[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/about")
      .then((res) => res.json())
      .then(setAboutList)
      .catch((err) => console.error("Failed to fetch about list", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleToggle = (field: keyof About) => (value: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (
    index: number,
    field: keyof socials,
    value: any
  ) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const addSocial = () => {
    setSocialLinks((prev) => [
      ...prev,
      {
        name: "",
        url: "",
        icon: "",
        isActive: true,
        isDeleted: false,
        about_id: 0,
      },
    ]);
  };

  const removeSocial = (index: number) => {
    const updated = [...socialLinks];
    updated.splice(index, 1);
    setSocialLinks(updated);
  };

  const submitAbout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("About submission failed");

      const data = await res.json();
      alert("About submitted successfully");

      // Refresh About list and clear form
      setFormData({
        name: "",
        status: true,
        contact: "",
        email: "",
        address: "",
        phone: "",
        website: "",
        description: "",
        image: "",
      });

      const updatedList = await fetch("http://localhost:4000/api/about").then(
        (res) => res.json()
      );
      setAboutList(updatedList);
    } catch (error) {
      console.error("Submit About Error:", error);
      alert("Failed to submit About");
    }
  };

  const submitSocials = async () => {
    try {
      for (const social of socialLinks) {
        if (!social.about_id) {
          alert("Each social must be linked to an About");
          return;
        }

        const res = await fetch("http://localhost:4000/api/socials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(social),
        });

        if (!res.ok) throw new Error("Social submission failed");

        const data = await res.json();
        console.log("Social submitted:", data);
      }

      alert("Socials submitted successfully");
      setSocialLinks([]);
    } catch (error) {
      console.error("Submit Socials Error:", error);
      alert("Failed to submit socials");
    }
  };

  return (
    <>  
    <h2>Register</h2>
    <hr />
    <Grid>
    <Column sm={4} lg={10} md={8} className="register">
      
      <Form>
        <TextInput
          id="name"
          labelText="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextInput
          id="contact"
          labelText="Contact"
          value={formData.contact}
          onChange={handleChange}
        />
        <TextInput
          id="email"
          labelText="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          id="address"
          labelText="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextInput
          id="phone"
          labelText="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextInput
          id="website"
          labelText="Website"
          value={formData.website}
          onChange={handleChange}
        />
        <TextInput
          id="image"
          labelText="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <TextArea
          id="description"
          labelText="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <Toggle
          id="status"
          labelText="Status"
          labelA="Inactive"
          labelB="Active"
          toggled={formData.status}
          onToggle={handleToggle("status")}
        />
        <Button type="button" onClick={submitAbout} style={{ marginTop: "1rem" }}>
          Submit About
        </Button>

        <hr style={{ margin: "2rem 0" }} />

        <h4>Social Links</h4>
        {socialLinks.map((link, index) => (
          <Stack key={index} gap={3}>
            <TextInput
              id={`social-name-${index}`}
              labelText="Name"
              value={link.name}
              onChange={(e) =>
                handleSocialChange(index, "name", e.target.value)
              }
            />
            <TextInput
              id={`social-url-${index}`}
              labelText="URL"
              value={link.url}
              onChange={(e) =>
                handleSocialChange(index, "url", e.target.value)
              }
            />
            <TextInput
              id={`social-icon-${index}`}
              labelText="Icon"
              value={link.icon}
              onChange={(e) =>
                handleSocialChange(index, "icon", e.target.value)
              }
            />
            <Toggle
              id={`social-active-${index}`}
              labelText="Active"
              labelA="No"
              labelB="Yes"
              toggled={link.isActive}
              onToggle={(val) =>
                handleSocialChange(index, "isActive", val)
              }
            />
            <Select
              id={`about-select-${index}`}
              labelText="Select About"
              value={link.about_id || 0}
              onChange={(e) =>
                handleSocialChange(index, "about_id", parseInt(e.target.value))
              }
            >
              <SelectItem disabled hidden value={0} text="Choose an About" />
              {aboutList.map((about) => (
                <SelectItem
                  key={about.id}
                  value={about.id}
                  text={about.name}
                />
              ))}
            </Select>
            <Button
              kind="danger--ghost"
              size="sm"
              onClick={() => removeSocial(index)}
              renderIcon={TrashCan}
            >
              Remove
            </Button>
          </Stack>
        ))}
        <Button kind="tertiary" onClick={addSocial} style={{ marginTop: "1rem" }}>
          + Add Social
        </Button>
        <Button type="button" onClick={submitSocials} style={{ marginTop: "1rem" }}>
          Submit Socials
        </Button>
      </Form>
    </Column>
    </Grid>
    </>
  );
};

export default Register;
