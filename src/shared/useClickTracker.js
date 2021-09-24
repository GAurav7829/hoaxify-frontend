import { useEffect, useState } from "react";

const useClickTracker = (actionArea) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useEffect(() => {
        const onClickTracker = (event) => {
            if (!actionArea.current) {
                setDropdownVisible(false);
                return;
            }
            if (dropdownVisible) {
                setDropdownVisible(false);
            } else if (actionArea.current.contains(event.target)) {
                setDropdownVisible(true);
            }
        }
        document.addEventListener('click', onClickTracker);
        return function cleanup() {
            document.removeEventListener('click', onClickTracker);
        }
    }, [actionArea, dropdownVisible]);

    return dropdownVisible;
}

export default useClickTracker;