import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, menu } from "@nextui-org/react";
import { headerConfig } from "@/globalConfig";

export default function () {
  const { menu } = headerConfig

  const onChangeMenu = (key,{children=[]}={}) => {
    window.location.href = children.find(child => child.key === key).path
  }


  return (
    <Navbar className="chuanyang-nav justify-center" classNames={'wrapper'}>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          menu.map((item) => {
            if (item.children) {
              return (
                <Dropdown key={item.key}> 
                  <NavbarItem  aria-label={item.label}>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                        variant="light"
                        startContent={item.icon}
                      >
                        <span>
                          {item.label}
                          {
                            item.children?.length ?
                              <i className="icon icon-unfold"></i> : ""
                          }
                        </span>
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    className="w-[340px]"
                    itemClasses={{
                      base: "gap-4",
                    }}
                    onAction={(key)=>onChangeMenu(key,item)}
                  >
                    {
                      item.children.map((child) => {
                        return (
                          <DropdownItem
                            key={child.key}
                            aria-label={child.label}
                            description={child.description}
                            startContent={child.icon}
                          >
                            {
                              child.label
                            }
                          </DropdownItem>
                        );
                      })
                    }
                  </DropdownMenu>
                </Dropdown>
              );
            } else {
              return (
                <NavbarItem key={item.key}    aria-label={item.label}>
                  <Button disableRipple className="p-0 bg-transparent data-[hover=true]:bg-transparent" radius="sm" variant="light">
                    {
                      item.path ? (
                        <a href={item.path}>
                          {item.icon} &nbsp;
                          {item.label}
                        </a>
                      ) : (
                        <span>
                          {item.icon} &nbsp;
                          {item.label}
                        </span>
                      )
                    }
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
