import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, menu} from "@nextui-org/react";


export default function App() {

  const menu = [
    {
      key: "home",
      description: "首页",
      label: "首页",

    },
    {
      key: "文章",
      label: "文章",
      children:[
        {
          key: "category",
          label: "分类",
          description: "文章分类",
        },
        {
          key: "tag",
          label: "标签",
          description: "文章标签",
        },
        {
          key: "archive",
          label: "归档",
          description: "文章归档",
        },
      ]
    },
    {
      key: "about",
      label: "关于",

    },
    {
      key: "contact",
      label: "联系",
    },
    {
      key: "friend",
      label: "朋友",
    },
  ];


  return (
    <Navbar className="justify-center" classNames={'wrapper'}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          menu.map((item) => {
            if (item.children) {
              return (
                <Dropdown key={item.key}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                        variant="light"
                      >
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    className="w-[340px]"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {
                      item.children.map((child) => {
                        return (
                          <DropdownItem
                            key={child.key}
                            description={child.description}
                          >
                            {child.label}
                          </DropdownItem>
                        );
                      })
                    }
                  </DropdownMenu>
                </Dropdown>
              );
            } else {
              return (
                <NavbarItem key={item.key}>
                  <Button disableRipple className="p-0 bg-transparent data-[hover=true]:bg-transparent" radius="sm" variant="light">
                    {item.label}
                  </Button>
                </NavbarItem>
              );
            }
          })
        }
      </NavbarContent>
    </Navbar>
  );
}
