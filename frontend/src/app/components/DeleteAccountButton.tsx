"use client";

import Link from "next/link";

export default function DeleteAccountButton() {
  return (
    <div>
      <label htmlFor="my_modal_6" className="btn">
        Delete Account
      </label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete your account?
          </h3>
          <p className="py-4"></p>
          <div className="modal-action">
            <Link href="/auth/delete" className="btn">
              Yes
            </Link>
            <a href="/" className="btn">
              No
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
